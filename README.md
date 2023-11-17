# Companies Browser App

### The Site

The site is showing a list of companies. A company card is allowing a user to see four key pieces of information:

1. Top-Level data about the company (website, description, etc)
2. Whether the company has gone through an IPO, and some data associated with that IPO if it exists
3. Whether the company has been acquired, and some data associated with the acquisition if it exists
4. Whether the company has made an acquisition, and some data associated with that acquisition if it exists

The specific data that I am showing, and how that data is presented can be customised.

Implemented filters to the company list:

1. Filter by _company name_ : Here user can provide multiple company names also
2. Filter by _country code_ : : Here user can provide multiple company country codes also
3. Filter by _has an IPO_ : If this is true , only those companies will be fetched who have done at least one IPO
4. Filter by _has made an acquisiton_ : If this is true , only those companies will be fetched who have made at least one acquistion
5. Filter by _has been acquired_ : If this is true , only those companies will be fetched who have been acquired by at least one company

By default, filters are `AND` filters, not `OR` filters.

**All filtering is happening on the backend**.


## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version >=16.20.1)


## Getting Started
1. **Clone the repository:**

    ```bash
    git clone https://github.com/rahul1368/companies-browser-app.git
    ```

2. **Navigate to the project folder:**

    ```bash
    cd companies-browser-app
    ```

3. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn
    ```

4. **Import objects.csv, ipos.csv & acquisitions.csv in objects, ipos & acquisitions mongodb collections respectively**

5. **Add your mongodb uri at src/migrate.ts in MONGODB_URI (line no 3)**

6. **Add your mongodb uri at next.config.js => env.mongodburl**

7. **Run DB migration (One time task only)**

```
node ./src/migrate.ts

```

8. Now, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/company-browser](http://localhost:3000) with your browser to see the result.


API route can be accessed on [http://localhost:3000/api/company-browser](http://localhost:3000/api/company-browser). This endpoint can be edited in `src/pages/api/company-browser/index.ts`.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Challenges Faced and Solutions Implemented

### Initial Approach: CSV Data Processing

In the initial stages of developing the Companies Browser App, I faced challenges in efficiently handling and processing data stored in CSV files. The primary concern was the scalability of my solution, as the CSV files were substantial and posed constraints on memory usage during merging operations. Attempting to develop an API endpoint without leveraging a database proved to be impractical and lacked the necessary scalability.

### Transition to MongoDB

To overcome these challenges, I pivoted towards a more scalable and performant solution by incorporating MongoDB. Three collections—Objects, IPOs, and Acquisitions—were created, and corresponding CSV data was imported into these collections. This transition to a database-centric approach addressed the limitations of my initial design.

### Database Migration for Enhanced Performance

A pivotal step in optimizing performance was the implementation of a database migration. The migration process culminated in the creation of the `FinalCompaniesData` collection, which contains the consolidated and refined company data required for API responses. This strategic move streamlined my data retrieval process, eliminating the need for joining multiple collections on each API request.

### Performance and Scalability

With this new architecture, my application achieved enhanced performance and scalability. The consolidated data in the `FinalCompaniesData` collection allows for faster and more efficient API responses. By executing filtration and pagination at the database query level, I have significantly improved the speed of data retrieval without compromising on the quality of results.

### Improved User Experience

The adoption of MongoDB as the primary data store, coupled with thoughtful database design and migration strategies, has translated into a more responsive and performant Companies Browser App. The challenges I initially faced prompted me to rethink my approach, ultimately leading to a more robust and scalable solution that ensures a seamless experience for my users.

This strategic evolution in my data handling approach underscores my commitment to delivering a high-quality, performant application that meets the demands of real-world data processing challenges. The Companies Browser App now stands as a testament to my dedication to continuous improvement and innovation.


# Future Project Improvements

While the project is running smoothly, I've got a list of improvements I'd love to tackle when I have some extra time. Here's the plan:

## Frontend Enhancements

1. **Responsive Refinement:**
   - When time permits, I'd like to refine our app's responsiveness for a more consistent experience across devices.

2. **UI Polish:**
   - I'm planning to spend some quality time enhancing the UI. Expect some design tweaks and a more polished look.

3. **Performance Tune-up:**
   - I've got my eye on the React components. A performance tune-up is on the horizon for a snappier user experience.

## Backend Optimizations

1. **Database Fine-Tuning:**
   - I've identified some opportunities to fine-tune our database. Exploring indexing strategies for improved query performance is on the agenda.

2. **Cache Implementation:**
   - Caching frequently used data is a priority. I'll be implementing caching strategies to reduce database load and enhance response times.

3. **Testing Expansion:**
   - As time allows, I'll be expanding our test suite. More tests mean a more robust codebase.

This project is a journey, and I'm looking forward to enhancing it when time allows.

Happy coding! 🚀
