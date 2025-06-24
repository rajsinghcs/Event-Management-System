# Event-Management-System

# 📘 Event Management System: Relational Database Design
Planning and managing an event can be complex and requires detailed information about various aspects such as participants, venue, schedule, and logistics. Relational databases are important components that store, retrieve, and manage data in a structured format.

# Event Management Features
Event Management: Create events with details like ID, name, date, time, and location, etc.,
Attendee Management: Collect and analyze the information from attendees to improve future events.
Venue management: Create venue details including venue name, capacity, and availability.
Guest Management: Manage attendee information and seating arrangements.
Expenses and Budgeting: Track event expenses and budgets.

# Entities and Attributes of the Event Management
Entities act as building blocks of the database which represents the objects that are needed to be stored and managed. Attributes are the properties or characteristics of each entity.

# Relational Database Schema for Event Management
This schema consists of six primary tables designed to efficiently manage event-related data. Each table captures specific aspects of event management, with foreign key relationships ensuring data integrity across entities.

## 1. Event Table: Stores Event Information
EVENT_ID (Primary Key): A unique identifier for each event.
EVENT_NAME: The name or title of the event.
EVENT_DATE: The scheduled date for the event.

## 2. Attendee Table: Stores Attendee Information
ATTENDEE_ID (Primary Key): A unique identifier for each attendee.
NAME: The full name of the attendee.
NUMBER: The contact number of the attendee.
EVENT_ID: A foreign key linking to the EVENT_ID in the Event table, indicating which event the attendee is participating in.

## 3. Venue Table: Contains Venue Information
VENUE_ID (Primary Key): A unique identifier for each venue.
VENUE_NAME: The name of the venue.
CAPACITY: The maximum capacity of the venue, indicating how many people it can accommodate.

## 4. Task Table: Stores Tasks or Actions for an Event
TASK_ID (Primary Key): A unique identifier for each task.
NAME: A description or title for the task.
EVENT_ID: A foreign key referencing the EVENT_ID in the Event table, showing the event to which the task belongs.

## 5. Schedule Table: Details the Timing for Event Activities
SCHEDULE_ID (Primary Key): A unique identifier for each schedule entry.
EVENT_ID: A foreign key referencing the EVENT_ID in the Event table.
START_DATE: The starting date (and/or time) of the scheduled activity.
END_DATE: The ending date (and/or time) of the scheduled activity.

## 6. Budget Table: Captures Financial Planning Details
BUDGET_ID (Primary Key): A unique identifier for each budget record.
EVENT_ID: A foreign key referencing the EVENT_ID in the Event table.
TOTAL_BUDGET: The total budget allocated for the event.

# Relationships between these entities
One-to-Many: One event can have multiple attendees.
One-to-Many: An event consists of many tasks.
Many-to-One: Many attendees can attend one event.
Many-to-One: A task is part of one event





![ER_Diagram](https://github.com/user-attachments/assets/d0541c51-4faf-4583-9927-5f1c42f4cc61)
