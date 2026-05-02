# Stage 1

## Approach to Finding Top 10 Notifications

To efficiently determine the top 10 notifications for the Priority Inbox, we need to sort the notifications based on a composite priority metric that considers both **weight** and **recency**.

### 1. Weight Assignment
First, we assign an integer weight to each notification type as specified in the requirements:
- `Placement` -> 3
- `Result` -> 2
- `Event` -> 1

### 2. Sorting Logic
When a request is made to display the priority notifications, we fetch the relevant unread notifications and apply a multi-level sort algorithm:

1. **Primary Sort (Weight):** Notifications are sorted in descending order based on their assigned weight. A `Placement` notification will always appear before a `Result` notification, and a `Result` will always appear before an `Event`.
2. **Secondary Sort (Recency):** If two notifications have the exact same weight (e.g., two `Placement` notifications), we compare their `Timestamp`. The notification with the more recent timestamp (closer to current time) will be ranked higher.

### 3. Implementation Steps (Frontend Extraction)
1. **Fetch**: Retrieve all unread notifications.
2. **Sort**: Use JavaScript's built-in `Array.prototype.sort()` with a custom comparator function:
   ```typescript
   notifications.sort((a, b) => {
     const weightDiff = getWeight(b.Type) - getWeight(a.Type);
     if (weightDiff !== 0) {
       return weightDiff; // Sort by weight descending
     }
     // If weights are equal, sort by timestamp descending
     return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
   });
   ```
3. **Slice**: After sorting the entire list of unread notifications, we use `slice(0, 10)` to extract exactly the top 10 notifications for display in the Priority Inbox.

This approach guarantees an accurate, deterministic ordering that prioritizes critical placement and result updates while maintaining chronologically sensible results within each category.
