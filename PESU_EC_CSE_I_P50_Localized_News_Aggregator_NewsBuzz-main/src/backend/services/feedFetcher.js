// src/backend/services/feedFetcher.js
import Parser from "rss-parser";
import Feed from "../models/feedModel.js";
import Article from "../models/articleModel.js";
import IngestionReport from "../models/ingestionReportModel.js";
// LOC-8 

const parser = new Parser();

function categorizeArticle(title) {
  const lower = (title || "").toLowerCase();
  if (lower.includes("ai") || lower.includes("tech")) return "Technology";
  if (lower.includes("election") || lower.includes("government")) return "Politics";
  if (lower.includes("match") || lower.includes("tournament") || lower.includes("cricket")) return "Sports";
  if (lower.includes("movie") || lower.includes("music") || lower.includes("film")) return "Entertainment";
  if (lower.includes("market") || lower.includes("finance") || lower.includes("business")) return "Business";
  return "Other";
}

export const fetchFeeds = async () => {
  const report = new IngestionReport({
    startedAt: new Date(),
    feedSummaries: [],
    totals: { feedsProcessed: 0, totalParsed: 0, totalAdded: 0 }
  });

  try {
    const feeds = await Feed.find();
    report.totals.feedsProcessed = feeds.length;

    for (const feed of feeds) {
      const feedSummary = {
        feedId: feed._id,
        name: feed.name,
        url: feed.url,
        parsedCount: 0,
        addedCount: 0,
        error: null
      };

      try {
        const parsedFeed = await parser.parseURL(feed.url);
        feedSummary.parsedCount = parsedFeed.items.length || 0;
        report.totals.totalParsed += feedSummary.parsedCount;

        for (const item of parsedFeed.items) {
          const exists = await Article.findOne({ link: item.link });
          if (!exists) {
            const newArticle = new Article({
              title: item.title,
              link: item.link,
              summary: item.contentSnippet || item.content || "",
              category: categorizeArticle(item.title) || feed.category || "Other",
              source: feed.name,
              publishedDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            });
            await newArticle.save();
            feedSummary.addedCount++;
            report.totals.totalAdded++;
          }
        }
      } catch (feedErr) {
        feedSummary.error = feedErr.message || String(feedErr);
        // don't rethrow — record and continue processing other feeds
      }

      report.feedSummaries.push(feedSummary);
    }

    // set status: failed if all feeds failed, partial if some failed
    const anyErrors = report.feedSummaries.some(f => f.error);
    const allFailed = report.feedSummaries.length > 0 && report.feedSummaries.every(f => f.error);
    report.status = allFailed ? "failed" : anyErrors ? "partial" : "success";

    report.finishedAt = new Date();
    await report.save();

    console.log(`Feed fetching complete. Totals: parsed=${report.totals.totalParsed}, added=${report.totals.totalAdded}`);
  } catch (err) {
    // fatal error: save report as failed if possible
    report.finishedAt = new Date();
    report.status = "failed";
    report.meta.error = err.message || String(err);
    try { await report.save(); } catch (e) { console.error("Failed saving ingestion report:", e.message); }
    console.error("Error fetching feeds:", err);
  }
};
