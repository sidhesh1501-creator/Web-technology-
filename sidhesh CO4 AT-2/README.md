# IT Service Request Management System (MVC Architecture)

A professional, enterprise-grade web application built strictly in compliance with the **Model-View-Controller (MVC)** design pattern using **Java Servlets, JSP, HTML5, CSS3, JavaScript, and Apache Tomcat**.

---

## 1. Project Directory Structure

```text
ITServiceRequestManagement/
│
├── pom.xml                                   # Maven configuration & build descriptor
├── README.md                                 # Complete documentation & run instructions
│
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── service/
        │           ├── model/
        │           │   └── ServiceRequest.java          # [MODEL] Java Bean representing request data
        │           │
        │           └── controller/
        │               └── ServiceRequestServlet.java   # [CONTROLLER] Servlet handling POST & validation
        │
        └── webapp/
            ├── index.jsp                                # Root entry point redirect
            ├── serviceRequest.jsp                       # [VIEW 1] Service Request Input Form
            ├── acknowledgement.jsp                      # [VIEW 2] Processed Confirmation & MVC Breakdown
            │
            ├── css/
            │   └── style.css                            # Modern Enterprise SaaS styling
            │
            ├── js/
            │   └── script.js                            # UI micro-interactions & client-side helpers
            │
            └── WEB-INF/
                └── web.xml                              # Deployment Descriptor & Servlet Mappings
```

---

## 2. MVC Architecture Implementation

This project strictly adheres to the Model-View-Controller paradigm:

```text
               +-------------------------------------------------------------+
               |                       EMPLOYEE / USER                       |
               +-------------------------------------------------------------+
                                       |                     ^
                     1. Submits Form   |                     | 7. Displays Ticket &
                        (HTTP POST)    v                     |    Confirmation
               +----------------------------------+          |
               |       serviceRequest.jsp         |          |
               |            [ VIEW ]              |          |
               +----------------------------------+          |
                                       |                     |
                                       | 2. Passes Request   |
                                       v                     |
               +-------------------------------------------------------------+
               |                ServiceRequestServlet.java                   |
               |                       [ CONTROLLER ]                        |
               |  - Reads parameters via request.getParameter()              |
               |  - Executes rigorous Server-Side Validation                 |
               |  - Generates Unique Ticket ID (e.g. SR-1001)                 |
               |  - Sets Request Attributes: "serviceRequest", "requestNumber"|
               |  - Forwards execution using RequestDispatcher               |
               +-------------------------------------------------------------+
                          |                                   |
         3. Instantiates  |                                   | 6. Forwards with
            & Populates   v                                   |    Request Attributes
               +-----------------------+                      v
               |  ServiceRequest.java  |           +-------------------------+
               |       [ MODEL ]       | --------> |   acknowledgement.jsp   |
               |  - employeeId         | 4. Binds  |        [ VIEW ]         |
               |  - employeeName       |    Model  +-------------------------+
               |  - department         |    Object
               |  - problemCategory    |
               |  - problemDescription |
               |  - priority           |
               |  - getters & setters  |
               +-----------------------+
```

### Component Roles

| Layer | Component | File Path | Responsibilities |
| :--- | :--- | :--- | :--- |
| **Model** | `ServiceRequest.java` | `com.service.model.ServiceRequest` | Encapsulates request attributes (`employeeId`, `employeeName`, `department`, `problemCategory`, `problemDescription`, `priority`, `requestNumber`, `submissionDate`, `status`). Contains constructors, getters, setters, and `toString()`. Contains zero UI or presentation code. |
| **Controller** | `ServiceRequestServlet.java` | `com.service.controller.ServiceRequestServlet` | Handles HTTP POST from `serviceRequest.jsp`, trims and validates input fields, instantiates `ServiceRequest` model upon success, generates sequential ticket identifier (`SR-1001`), attaches attributes, and forwards to `acknowledgement.jsp`. Handles validation failures by repopulating previous inputs and forwarding back to form. |
| **View 1** | `serviceRequest.jsp` | `src/main/webapp/serviceRequest.jsp` | Renders the professional input form, category selection tiles, priority badges, and displays server-side validation error messages when triggered. |
| **View 2** | `acknowledgement.jsp` | `src/main/webapp/acknowledgement.jsp` | Retrieves request attributes (`serviceRequest`, `requestNumber`), displays ticket confirmation summary, copy ticket number button, print summary option, and visual MVC architectural breakdown. |

---

## 3. How to Run with Apache Tomcat

### Option A: Running in Eclipse Enterprise / IDE (Recommended for Development)

1. Open **Eclipse IDE for Enterprise Java and Web Developers** (or IntelliJ IDEA / NetBeans).
2. Go to **File -> Import -> Maven -> Existing Maven Projects** (or **File -> New -> Dynamic Web Project** and copy `src/` files).
3. Ensure the project runtime is targeted to **Apache Tomcat 10.x** (or Tomcat 9.x with `javax.servlet` dependencies).
4. Right-click the project folder `ITServiceRequestManagement` -> **Run As -> Run on Server**.
5. Select your configured **Apache Tomcat** server and click **Finish**.
6. The browser will open:
   ```
   http://localhost:8080/ITServiceRequestManagement/serviceRequest.jsp
   ```

---

### Option B: Building a WAR and Deploying to Standalone Tomcat

1. Build the WAR file using Maven:
   ```bash
   mvn clean package
   ```
   *This generates `ITServiceRequestManagement.war` inside the `target/` directory.*

2. Copy `ITServiceRequestManagement.war` to your Apache Tomcat installation's `webapps/` folder:
   ```bash
   copy target\ITServiceRequestManagement.war "%CATALINA_HOME%\webapps\"
   ```

3. Start Apache Tomcat:
   - **Windows:** Run `%CATALINA_HOME%\bin\startup.bat`
   - **Linux/macOS:** Run `$CATALINA_HOME/bin/startup.sh`

4. Open your web browser and navigate to:
   ```
   http://localhost:8080/ITServiceRequestManagement/
   ```

---

### Option C: Direct Manual Deployment (No Maven Required)

1. Copy the contents of `src/main/webapp/` into `%CATALINA_HOME%\webapps\ITServiceRequestManagement\`.
2. Compile the Java files with Tomcat's servlet JAR in classpath:
   ```cmd
   mkdir "%CATALINA_HOME%\webapps\ITServiceRequestManagement\WEB-INF\classes"

   javac -cp "%CATALINA_HOME%\lib\servlet-api.jar" -d "%CATALINA_HOME%\webapps\ITServiceRequestManagement\WEB-INF\classes" src\main\java\com\service\model\ServiceRequest.java src\main\java\com\service\controller\ServiceRequestServlet.java
   ```
3. Start Tomcat and visit `http://localhost:8080/ITServiceRequestManagement/serviceRequest.jsp`.

---

## 4. Assessment Alignment Breakdown

| Assessment Requirement | Satisfied By | Implementation Detail |
| :--- | :--- | :--- |
| **Q1: JSP Input Form** | `serviceRequest.jsp` | Method `POST`, targets `ServiceRequestServlet`. Includes Employee ID, Employee Name, Department dropdown, Problem Category, Description textarea, Priority radio options, Submit & Reset buttons. |
| **Q2: Java Model Class** | `ServiceRequest.java` | Standard JavaBean with `employeeId`, `employeeName`, `department`, `problemCategory`, `problemDescription`, `priority`, constructors, getters, setters. Free from presentation/HTML logic. |
| **Q3: Servlet Controller** | `ServiceRequestServlet.java` | Implements `doPost()`, `request.getParameter()`, comprehensive server-side validation, Model instantiation, unique request ID generation (`SR-1001`), `request.setAttribute()`, and `RequestDispatcher.forward()`. Uses local method variables to maintain thread-safety. |
| **Q4: Acknowledgement View** | `acknowledgement.jsp` | Extracts Model and Request Number attributes, displays professional ticket receipt, success indicators, and contains the "How MVC Works" visual educational breakdown. |

---

## 5. Testing & Verification Guide

### Test Case 1: Successful Service Request Submission
1. Navigate to `http://localhost:8080/ITServiceRequestManagement/serviceRequest.jsp`.
2. Enter the following values:
   - **Employee ID:** `192521193`
   - **Employee Name:** `John Doe`
   - **Department:** `Computer Science`
   - **Problem Category:** `Software`
   - **Problem Description:** `Unable to install the required development IDE and database management software.`
   - **Priority:** `High`
3. Click **"Submit Service Request"**.
4. **Expected Result:**
   - URL forwards to `acknowledgement.jsp`.
   - Green animated checkmark appears with "Service Request Submitted Successfully".
   - Unique Ticket Number `SR-1001` is generated and displayed.
   - Summary table correctly displays all employee and problem metadata.
   - MVC architecture workflow diagram is rendered at the bottom.

---

### Test Case 2: Server-Side Validation (Empty / Missing Fields)
1. Navigate to `serviceRequest.jsp`.
2. Leave **Employee Name** blank or enter a description with fewer than 10 characters.
3. Click **"Submit Service Request"**.
4. **Expected Result:**
   - Form does NOT proceed to `acknowledgement.jsp`.
   - Red alert banner displays: *"Please complete all required fields correctly before submitting."*
   - Field-specific error hints appear directly under invalid inputs.
   - Previously typed valid fields are preserved (no data loss).

---

### Test Case 3: Thread-Safety & Sequential Request Numbers
1. Submit another request with different employee details.
2. **Expected Result:**
   - Generates next sequential ticket: `SR-1002`, `SR-1003`, etc.
   - No data from previous submissions leaks across different requests.

---

## 6. Design & Accessibility Highlights

- **Palette:** Enterprise SaaS Dark Navy (`#0F172A`), Royal Blue (`#1D4ED8`, `#2563EB`), Crisp White cards, and Light Blue-Gray background (`#F8FAFC`).
- **No Cybersecurity / Hacker Clutter:** Clean, professional software company aesthetic.
- **Offline Capable:** 100% self-contained CSS, standard web fonts, and embedded SVG icons (zero external CDN or API dependencies).
- **Responsive:** Fluid CSS Grid and Flexbox layouts for mobile, tablet, laptop, and desktop.
- **Print Friendly:** Dedicated `@media print` CSS rules for clean ticket printing.
