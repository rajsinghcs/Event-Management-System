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

Consider six tables event, attendee, venue, task, schedule, and budget.

Event tables can include columns such as EVENT_ID, EVENT_NAME, and EVENT_DATE.
Attendee tables can include ATTENDEE_ID, NAME, NUMBER, and EVENT_ID.
Venue tables can include VENUE_ID, VENUE_NAME and CAPACITY. 
Task tables can include TASK_ID, NAME, and EVENT_ID.
Schedule tables can include SCHEDULE_ID, EVENT_ID, START_ID and END_ID.
Budget tables can include BUDGET_ID, EVENT_ID, and TOTAL_BUDGET.

## 1. Event table: Stores event information
EVENT_ID (Primary key): Unique identifier for each event.
EVENT_NAME: It describes the name of the event.
EVENT_DATE: It describes the Date of the Event.

## 2. Attendee table: Store attendee's information
ATTENDEE_ID (Primary key): Unique identifier for each attendee.
NAME: It describes the name of the attendee.
NUMBER: It describes the phone number of the attendee.
EVENT_ID: It is a foreign key(references EVENT_ID in the Event table).

## 3. Venue table: Contains information about the event
VENUE_ID(Primary key): unique identifier for each venue.
VENUE_NAME: It describes the name of the venue.
CAPACITY: It describes the maximum capacity of the venue.

## 4. Task table: An action needs to be completed for the event
TASK_ID(Primary key): unique identifier for each task.
NAME: It describes the name of the task.
EVENT_ID: It is a foreign key(references EVENT_ID in the Event table).

## 5. Schedule table: Arrange to take place at a particular time
SCHEDULE_ID(Primary Key): unique identifier for each Schedule.
EVENT_ID: It is a foreign key(references EVENT_ID in the Event table).
START_DATE: It describes the starting date of the event.
END_DATE: It describes the ending date of the event.

## 6. Budget table: A financial planning
BUDGET_ID(Primary Key): unique identifier for each budget.
EVENT_ID: It is a foreign key(references EVENT_ID in the Event table).
TOTAL_BUDGET: It describes the total budget of the event.

# Relationships between these entities
One-to-Many: One event can have multiple attendees.
One-to-Many: An event consists of many tasks.
Many-to-One: Many attendees can attend one event.
Many-to-One: A task is part of one event.


![ER_Diagram](https://github.com/user-attachments/assets/d0541c51-4faf-4583-9927-5f1c42f4cc61)
