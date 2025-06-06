## How should we structure a Firestore query that supports pagination to efficiently retrieve the highest potential users? Please include all mathematical formulas used in the query.

To efficiently retrieve high-potential users with pagination support, we calculate a `totalScore` for each user using this formula:

### **Score Formula**

```js
totalScore =
  (user.totalAverageWeightRatings * 1, 000, 000) +
  (user.numberOfRents * 1, 000) +
  user.recentlyActive;
```

- `totalAverageWeightRatings` gets the highest priority (multiplied by 1,000,000).
- `numberOfRents` is second (multiplied by 1,000).
- `recentlyActive` is a timestamp used as a tiebreaker.

You should store this `totalScore` in the Firestore document and update it whenever any of the involved fields change.

### **Firestore Query with Pagination**

```js
const snapshot = await usersRef
  .select(
    "id",
    "name",
    "totalScore",
    "numberOfRents",
    "recentlyActive",
    "totalAverageWeightRatings"
  )
  .orderBy("totalScore", "desc")
  .limit(limit)
  .offset(pageNumber * limit)
  .get();
```

## How do you ensure the user's online/offline status and the 'recently active' field in a Firestore document remains updated? Please explain the method you use to keep the data fresh and the reasoning behind your approach.

I update the recentlyActive field whenever a user logs in or accesses any website endpoint. This allows me to accurately track when the user was last active. I ensure the field is consistently updated whenever the user performs an activity.

## Part 5: Personality & technical Questions

1. Based on this URL link https://www.reddit.com/settings (login into Reddit). Without looking at the code base, which part of the settings page is NOT server side component? Please explain how to get your answer.

- From when i look at it, the settings page menu tabs is server side components. I learn that, it doesn't need to get data from server side because it is static for the options and menu tabs on reddit.

2. What are the most difficult technical problems in your work experience you have encountered and how do you fix them?

- I used to work with 3rd party API for WhatsApp. Its like a community 3rd part like baileys to create a WhatsApp broadcast and Chat for CRM app. But because it is not well maintained and not well documented, I find it difficult to use it. So what I do, is search the issues and create issues when it doesn't work. What's worse is the creator of it got a cease and desease from Meta. Also from what I can do at that time, is downloading the source code of that package. After that, I can debug it. Even though it was like a dead end, but with that, I can debug and fix some bugs caused by it.

3. When you’re working on a project, how do you typically approach it from start to finish?

- I approach the project by seeing the goal of it and understanding what I make. When I understand it, I can have a sense of belonging from that app, which drives me to finish the project efficiently and agile.

4. How do you usually approach learning a new topic to absorb as much as possible?

- I tend to learn as fast as possible, and learn the practical way. I've had a project with a techstack I was not familiar before with GO-Lang. When I got that project and that project needs to be finished fast, I learn it by doing it. With documentations from that and by seeing the best practice for it.

5. “Consistency” vs “fast & efficient”. Choose one.

- Fast & efficient.

6. Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…

- No, I mainly use windows for coding.

7. What is your immediate availability to start this job?

- 1 Month notice
