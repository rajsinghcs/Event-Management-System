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
Schedule tables can include SCHEDULE_ID, EVENT_ID, START_ID and END_ID.
Budget tables can include BUDGET_ID, EVENT_ID, and TOTAL_BUDGET.
