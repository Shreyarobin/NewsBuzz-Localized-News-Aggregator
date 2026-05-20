**UE23CS341A — UAT Document

Project ID: P50 — Localized News Aggregator**

Prepared By: Shimona Sinha
Sprint: 1 & 2
Version: 1.0
1. Introduction

This User Acceptance Test (UAT) validates whether the Localized News Aggregator system meets all functional requirements across backend, frontend, and integrated workflows.
The goal is to confirm that the system behaves correctly from an end-user perspective.

2. Scope

The UAT covers:

User registration & login

Role management (Admin, Reader, Editor)

News aggregation from multiple sources

Personalized suggestions

Bookmarking and global feed

Admin dashboards & analytics

Search, filtering, and category views

Frontend–backend integration

Error handling & UI flow

3. UAT Test Cases
 TC-01 — User Registration
Step	Expected Result
User enters details & registers	Registration successful
 TC-02 — User Login
Step	Expected Result
Enter valid email/password	Redirects to dashboard
 TC-03 — News Aggregation
Step	Expected Result
System fetches external news sources	Articles are displayed in Global Feed
 TC-04 — Personalized Suggestions
Step	Expected Result
User selects categories	Tailored suggestions appear
 TC-05 — Bookmark Article
Step	Expected Result
Click bookmark icon	Article saved to Bookmarks
 TC-06 — Admin Dashboard
Step	Expected Result
Admin login	Admin reports & analytics visible
 TC-07 — Search & Filtering
Step	Expected Result
Search by keyword/category	Matching results are shown instantly
 TC-08 — Error Handling
Step	Expected Result
Invalid input / server failure	UI shows meaningful error message
4. UAT Status Summary
Feature	Status
Registration / Login	✔ Passed
Role Manager	✔ Passed
News Aggregation	✔ Passed
Personalization	✔ Passed
Bookmarks	✔ Passed
Filtering & Search	✔ Passed
Admin Dashboard	✔ Passed
Integration	✔ Passed
5. UAT Approval

All tests PASSED successfully through the 5 stage pipeline(build+ deploy+ test+ security).
The system is ready for demonstration and deployment.

Approved By:
-> Product Owner
-> QA Lead
-> Development Team Lead
->Scrum master