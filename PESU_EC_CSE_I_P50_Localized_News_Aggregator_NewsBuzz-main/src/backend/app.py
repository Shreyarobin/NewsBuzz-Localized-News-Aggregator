import streamlit as st
import feedparser
from bs4 import BeautifulSoup

st.set_page_config(page_title="NewsBuzz — Localized News Aggregator", layout="wide")

st.title("📰 NewsBuzz — Localized News Aggregator")

# Define RSS feeds
RSS_FEEDS = {
    "Local": [
        "https://rss.cnn.com/rss/edition.rss",
        "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
    ],
    "Technology": [
        "http://feeds.arstechnica.com/arstechnica/index",
        "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
    ],
    "World": [
        "https://feeds.bbci.co.uk/news/world/rss.xml"
    ]
}

def fetch_feed(url):
    feed = feedparser.parse(url)
    items = []
    for entry in feed.entries:
        title = entry.get("title", "")
        link = entry.get("link", "")
        summary = entry.get("summary", "")
        soup = BeautifulSoup(summary, "html.parser")
        clean_summary = soup.get_text()
        items.append({"title": title, "link": link, "summary": clean_summary})
    return items

def get_all_news():
    articles = []
    for category, feeds in RSS_FEEDS.items():
        for url in feeds:
            try:
                news_items = fetch_feed(url)
                for item in news_items:
                    item["category"] = category
                    articles.append(item)
            except Exception as e:
                st.warning(f"⚠️ Error fetching {url}: {e}")
    return articles

st.sidebar.header("Filters")

search_query = st.sidebar.text_input("Search by keyword")
selected_category = st.sidebar.selectbox("Select Category", ["All"] + list(RSS_FEEDS.keys()))
limit = st.sidebar.slider("Number of articles to show", 5, 50, 10)

all_news = get_all_news()

if selected_category != "All":
    all_news = [n for n in all_news if n["category"] == selected_category]

if search_query:
    query = search_query.lower()
    all_news = [n for n in all_news if query in n["title"].lower() or query in n["summary"].lower()]

st.write(f"### Showing {len(all_news)} results")
for n in all_news[:limit]:
    st.subheader(n["title"])
    st.write(n["summary"][:300] + "...")
    st.markdown(f"[Read more]({n['link']})")
    st.caption(f"Category: {n['category']}")
    st.write("---")
