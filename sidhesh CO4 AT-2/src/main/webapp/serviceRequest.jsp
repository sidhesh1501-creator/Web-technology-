<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map" %>
<%
    // Retrieve potential validation feedback from Controller
    String errorMessage = (String) request.getAttribute("errorMessage");
    @SuppressWarnings("unchecked")
    Map<String, String> fieldErrors = (Map<String, String>) request.getAttribute("fieldErrors");

    // Retrieve retained form values
    String prevEmpId = (request.getAttribute("prevEmployeeId") != null) ? (String) request.getAttribute("prevEmployeeId") : "";
    String prevEmpName = (request.getAttribute("prevEmployeeName") != null) ? (String) request.getAttribute("prevEmployeeName") : "";
    String prevDept = (request.getAttribute("prevDepartment") != null) ? (String) request.getAttribute("prevDepartment") : "";
    String prevCat = (request.getAttribute("prevProblemCategory") != null) ? (String) request.getAttribute("prevProblemCategory") : "Software";
    String prevDesc = (request.getAttribute("prevProblemDescription") != null) ? (String) request.getAttribute("prevProblemDescription") : "";
    String prevPrio = (request.getAttribute("prevPriority") != null) ? (String) request.getAttribute("prevPriority") : "Medium";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IT Service Request Management | Enterprise Portal</title>
    <meta name="description" content="Submit technical service requests for IT support, network, hardware, software, and account troubleshooting.">
    <link rel="stylesheet" href="<%= request.getContextPath() %>/css/style.css">
</head>
<body>

    <!-- Header Navigation -->
    <header class="navbar">
        <div class="nav-container">
            <a href="<%= request.getContextPath() %>/serviceRequest.jsp" class="brand-wrapper">
                <div class="brand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                </div>
                <div class="brand-text">
                    <h1>Enterprise IT Support</h1>
                    <span>Service Portal</span>
                </div>
            </a>
            <div class="nav-badges">
                <div class="badge-live-pulse">
                    <span class="status-dot"></span>
                    24/7 Service Desk Active
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="main-wrapper">

        <!-- Radiant Aurora Hero Section -->
        <section class="hero-section">
            <div class="hero-bg-orb-1"></div>
            <div class="hero-bg-orb-2"></div>
            <div class="hero-content">
                <div class="hero-badge-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Official Internal IT Service Desk Portal
                </div>
                <h2 class="hero-title">IT Service Request Management</h2>
                <p class="hero-subtitle">
                    Report technical issues quickly and help our IT team resolve them efficiently.
                    Track hardware, software, network, and account requests with automated SLA routing.
                </p>
                <div class="hero-actions">
                    <a href="#requestFormCard" id="btnScrollToForm" class="hero-btn-launch">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Create Service Request
                    </a>
                </div>

                <!-- Hero Metrics Stats Grid -->
                <div class="hero-stats-grid">
                    <div class="hero-stat-card">
                        <div class="hero-stat-icon pink">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
                        </div>
                        <div>
                            <div class="hero-stat-value">&lt; 15 Mins</div>
                            <div class="hero-stat-label">Avg. Triage Response</div>
                        </div>
                    </div>
                    <div class="hero-stat-card">
                        <div class="hero-stat-icon green">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div>
                            <div class="hero-stat-value">99.8% SLA</div>
                            <div class="hero-stat-label">Resolution Rate</div>
                        </div>
                    </div>
                    <div class="hero-stat-card">
                        <div class="hero-stat-icon cyan">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        </div>
                        <div>
                            <div class="hero-stat-value">1,420+</div>
                            <div class="hero-stat-label">Tickets Resolved</div>
                        </div>
                    </div>
                    <div class="hero-stat-card">
                        <div class="hero-stat-icon amber">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        </div>
                        <div>
                            <div class="hero-stat-value">8 Engineers</div>
                            <div class="hero-stat-label">On-Duty Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4 Creative Service Feature Preview Cards -->
        <section class="service-cards-preview">
            <div class="service-preview-card card-net chip-template" data-template="vpn">
                <div class="service-card-top">
                    <div class="service-card-icon net">🌐</div>
                    <div class="service-card-title">Network &amp; VPN</div>
                </div>
                <div class="service-card-desc">Wi-Fi connectivity, DNS errors, remote subnet VPN access.</div>
            </div>

            <div class="service-preview-card card-soft chip-template" data-template="software">
                <div class="service-card-top">
                    <div class="service-card-icon soft">💻</div>
                    <div class="service-card-title">Software &amp; IDEs</div>
                </div>
                <div class="service-card-desc">Developer toolchains, licenses, Docker, SDK setup.</div>
            </div>

            <div class="service-preview-card card-hard chip-template" data-template="hardware">
                <div class="service-card-top">
                    <div class="service-card-icon hard">🖥️</div>
                    <div class="service-card-title">Hardware &amp; Displays</div>
                </div>
                <div class="service-card-desc">Dual monitors, docking stations, laptops, peripherals.</div>
            </div>

            <div class="service-preview-card card-sec chip-template" data-template="account">
                <div class="service-card-top">
                    <div class="service-card-icon sec">🔐</div>
                    <div class="service-card-title">Accounts &amp; SSO</div>
                </div>
                <div class="service-card-desc">Single Sign-On, password reset, 2FA credential sync.</div>
            </div>
        </section>

        <!-- Interactive Quick-Fill & Demo Control Bar -->
        <section class="demo-control-bar">
            <div class="demo-bar-left">
                <div class="demo-badge-icon">⚡</div>
                <div>
                    <div class="demo-bar-title">Interactive Demo Control Toolbar</div>
                    <div class="demo-bar-subtitle">Click to populate realistic sample data into the form with 1 click</div>
                </div>
            </div>
            <div class="demo-chips-group">
                <button type="button" class="chip-btn autofill-main" id="btnAutoFillDemo">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
                    ⚡ Auto-Fill Sample Data
                </button>
                <button type="button" class="chip-btn chip-template" data-template="vpn">🌐 VPN Issue</button>
                <button type="button" class="chip-btn chip-template" data-template="software">💻 IDE Software</button>
                <button type="button" class="chip-btn chip-template" data-template="hardware">🖥️ 4K Monitor</button>
                <button type="button" class="chip-btn chip-template" data-template="account">🔑 SSO Auth</button>
            </div>
        </section>

        <!-- Service Request Form Card -->
        <section class="card" id="requestFormCard">
            <div class="card-header">
                <h3 class="card-title">Create Service Request</h3>
                <p class="card-subtitle">Tell us what you need help with. All fields marked with <span class="required-asterisk">*</span> are required.</p>
            </div>

            <div class="card-body">

                <!-- Server-Side Validation Error Alert (If Any) -->
                <% if (errorMessage != null) { %>
                    <div class="alert alert-danger" role="alert">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <div>
                            <strong>Validation Error:</strong> <%= errorMessage %>
                        </div>
                    </div>
                <% } %>

                <!-- MVC Form (Submits to ServiceRequestServlet via POST) -->
                <form id="serviceRequestForm" action="<%= request.getContextPath() %>/ServiceRequestServlet" method="POST">

                    <!-- Section 1: Employee Information -->
                    <div class="form-section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        1. Employee Information
                    </div>

                    <div class="form-grid">
                        <!-- Employee ID -->
                        <div class="form-group">
                            <label for="employeeId" class="form-label">
                                Employee ID <span class="required-asterisk">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="employeeId" 
                                name="employeeId" 
                                class="form-control <%= (fieldErrors != null && fieldErrors.containsKey("employeeId")) ? "is-invalid" : "" %>" 
                                placeholder="e.g. 192521193 or EMP-1042"
                                value="<%= prevEmpId %>"
                                required
                            >
                            <% if (fieldErrors != null && fieldErrors.containsKey("employeeId")) { %>
                                <div class="field-error-text">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                    <%= fieldErrors.get("employeeId") %>
                                </div>
                            <% } else { %>
                                <span class="input-hint">Your unique corporate employee identifier</span>
                            <% } %>
                        </div>

                        <!-- Employee Name -->
                        <div class="form-group">
                            <label for="employeeName" class="form-label">
                                Employee Name <span class="required-asterisk">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="employeeName" 
                                name="employeeName" 
                                class="form-control <%= (fieldErrors != null && fieldErrors.containsKey("employeeName")) ? "is-invalid" : "" %>" 
                                placeholder="e.g. John Doe"
                                value="<%= prevEmpName %>"
                                required
                            >
                            <% if (fieldErrors != null && fieldErrors.containsKey("employeeName")) { %>
                                <div class="field-error-text">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                    <%= fieldErrors.get("employeeName") %>
                                </div>
                            <% } else { %>
                                <span class="input-hint">Your full registered name</span>
                            <% } %>
                        </div>

                        <!-- Department -->
                        <div class="form-group full-width">
                            <label for="department" class="form-label">
                                Department <span class="required-asterisk">*</span>
                            </label>
                            <select 
                                id="department" 
                                name="department" 
                                class="form-control <%= (fieldErrors != null && fieldErrors.containsKey("department")) ? "is-invalid" : "" %>"
                                required
                            >
                                <option value="" disabled <%= prevDept.isEmpty() ? "selected" : "" %>>-- Select Your Department --</option>
                                <option value="Computer Science" <%= "Computer Science".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Computer Science</option>
                                <option value="Information Technology" <%= "Information Technology".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Information Technology</option>
                                <option value="Software Engineering" <%= "Software Engineering".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Software Engineering</option>
                                <option value="Quality Assurance & Testing" <%= "Quality Assurance & Testing".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Quality Assurance & Testing</option>
                                <option value="Human Resources" <%= "Human Resources".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Human Resources</option>
                                <option value="Finance & Accounts" <%= "Finance & Accounts".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Finance & Accounts</option>
                                <option value="Operations & Logistics" <%= "Operations & Logistics".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Operations & Logistics</option>
                                <option value="Marketing & Sales" <%= "Marketing & Sales".equalsIgnoreCase(prevDept) ? "selected" : "" %>>Marketing & Sales</option>
                            </select>
                            <% if (fieldErrors != null && fieldErrors.containsKey("department")) { %>
                                <div class="field-error-text">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                    <%= fieldErrors.get("department") %>
                                </div>
                            <% } %>
                        </div>
                    </div>

                    <!-- Section 2: Issue Details -->
                    <div class="form-section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                        2. Issue Details &amp; Categorization
                    </div>

                    <!-- Problem Category -->
                    <div class="form-group" style="margin-bottom: 1.85rem;">
                        <label class="form-label">
                            Problem Category <span class="required-asterisk">*</span>
                        </label>
                        <div class="category-tiles">
                            <!-- Network -->
                            <label class="category-tile-label">
                                <input type="radio" name="problemCategory" value="Network" <%= "Network".equalsIgnoreCase(prevCat) ? "checked" : "" %> required>
                                <div class="category-tile-box">
                                    <div class="category-icon-circle">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                    </div>
                                    <span>Network</span>
                                </div>
                            </label>

                            <!-- Software -->
                            <label class="category-tile-label">
                                <input type="radio" name="problemCategory" value="Software" <%= "Software".equalsIgnoreCase(prevCat) ? "checked" : "" %>>
                                <div class="category-tile-box">
                                    <div class="category-icon-circle">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                    </div>
                                    <span>Software</span>
                                </div>
                            </label>

                            <!-- Hardware -->
                            <label class="category-tile-label">
                                <input type="radio" name="problemCategory" value="Hardware" <%= "Hardware".equalsIgnoreCase(prevCat) ? "checked" : "" %>>
                                <div class="category-tile-box">
                                    <div class="category-icon-circle">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                                    </div>
                                    <span>Hardware</span>
                                </div>
                            </label>

                            <!-- Account -->
                            <label class="category-tile-label">
                                <input type="radio" name="problemCategory" value="Account" <%= "Account".equalsIgnoreCase(prevCat) ? "checked" : "" %>>
                                <div class="category-tile-box">
                                    <div class="category-icon-circle">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle></svg>
                                    </div>
                                    <span>Account</span>
                                </div>
                            </label>

                            <!-- Other -->
                            <label class="category-tile-label">
                                <input type="radio" name="problemCategory" value="Other" <%= "Other".equalsIgnoreCase(prevCat) ? "checked" : "" %>>
                                <div class="category-tile-box">
                                    <div class="category-icon-circle">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                    </div>
                                    <span>Other</span>
                                </div>
                            </label>
                        </div>
                        <% if (fieldErrors != null && fieldErrors.containsKey("problemCategory")) { %>
                            <div class="field-error-text" style="margin-top: 0.5rem;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                <%= fieldErrors.get("problemCategory") %>
                            </div>
                        <% } %>
                    </div>

                    <!-- Problem Description -->
                    <div class="form-group" style="margin-bottom: 1.85rem;">
                        <label for="problemDescription" class="form-label">
                            Problem Description <span class="required-asterisk">*</span>
                        </label>
                        <textarea 
                            id="problemDescription" 
                            name="problemDescription" 
                            class="form-control <%= (fieldErrors != null && fieldErrors.containsKey("problemDescription")) ? "is-invalid" : "" %>"
                            placeholder="Describe the issue in detail (error messages, application names, steps to reproduce)..."
                            required
                        ><%= prevDesc %></textarea>
                        <div class="input-hint">
                            <span>Be as descriptive as possible to accelerate triage</span>
                            <span id="descCharCount">0 characters (min. 10)</span>
                        </div>
                        <% if (fieldErrors != null && fieldErrors.containsKey("problemDescription")) { %>
                            <div class="field-error-text" style="margin-top: 0.35rem;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                <%= fieldErrors.get("problemDescription") %>
                            </div>
                        <% } %>
                    </div>

                    <!-- Priority Level -->
                    <div class="form-group" style="margin-bottom: 1.85rem;">
                        <label class="form-label">
                            Priority Level <span class="required-asterisk">*</span>
                        </label>
                        <div class="priority-options">
                            <!-- Low Priority -->
                            <label class="priority-label">
                                <input type="radio" name="priority" value="Low" <%= "Low".equalsIgnoreCase(prevPrio) ? "checked" : "" %> required>
                                <div class="priority-card low">
                                    <span class="priority-dot-ring"></span>
                                    <div>
                                        <span class="priority-name">Low</span>
                                        <div class="priority-desc">🟢 Standard Queue / Minor</div>
                                    </div>
                                </div>
                            </label>

                            <!-- Medium Priority -->
                            <label class="priority-label">
                                <input type="radio" name="priority" value="Medium" <%= "Medium".equalsIgnoreCase(prevPrio) ? "checked" : "" %>>
                                <div class="priority-card medium">
                                    <span class="priority-dot-ring"></span>
                                    <div>
                                        <span class="priority-name">Medium</span>
                                        <div class="priority-desc">🟡 Expedited / Workflow Affected</div>
                                    </div>
                                </div>
                            </label>

                            <!-- High Priority -->
                            <label class="priority-label">
                                <input type="radio" name="priority" value="High" <%= "High".equalsIgnoreCase(prevPrio) ? "checked" : "" %>>
                                <div class="priority-card high">
                                    <span class="priority-dot-ring"></span>
                                    <div>
                                        <span class="priority-name">High</span>
                                        <div class="priority-desc">🔴 Critical Blocker / Urgent</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <% if (fieldErrors != null && fieldErrors.containsKey("priority")) { %>
                            <div class="field-error-text" style="margin-top: 0.5rem;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>
                                <%= fieldErrors.get("priority") %>
                            </div>
                        <% } %>
                    </div>

                    <!-- Form Action Buttons -->
                    <div class="form-actions">
                        <button type="reset" id="btnResetForm" class="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                            Reset Form
                        </button>
                        <button type="submit" id="btnSubmitRequest" class="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            Submit Service Request
                        </button>
                    </div>

                </form>
            </div>
        </section>

        <!-- Live Active Queue Table -->
        <section class="live-queue-card">
            <div class="live-queue-header">
                <div class="live-queue-title">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet)" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Live IT Support Queue (Active Status Feed)
                </div>
                <span class="badge badge-status">● Telemetry Stream Active</span>
            </div>

            <table class="live-table">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong style="font-family: var(--font-mono); color: var(--color-violet);">SR-1001</strong></td>
                        <td>John Doe</td>
                        <td>Computer Science</td>
                        <td><span class="badge badge-category">Software</span></td>
                        <td><span class="badge badge-high">● High</span></td>
                        <td><span class="badge badge-status">Assigned / In Progress</span></td>
                    </tr>
                    <tr>
                        <td><strong style="font-family: var(--font-mono); color: var(--color-violet);">SR-1002</strong></td>
                        <td>Sarah Jenkins</td>
                        <td>Software Engineering</td>
                        <td><span class="badge badge-category">Network</span></td>
                        <td><span class="badge badge-high">● High</span></td>
                        <td><span class="badge badge-low">Resolved</span></td>
                    </tr>
                    <tr>
                        <td><strong style="font-family: var(--font-mono); color: var(--color-violet);">SR-1003</strong></td>
                        <td>Michael Chang</td>
                        <td>Information Technology</td>
                        <td><span class="badge badge-category">Hardware</span></td>
                        <td><span class="badge badge-medium">● Medium</span></td>
                        <td><span class="badge badge-status">Under Review</span></td>
                    </tr>
                </tbody>
            </table>
        </section>

    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>© 2026 IT Service Request Management System. MVC Architecture (Java Servlet, JSP & Model).</p>
    </footer>

    <!-- Client-side helper scripts -->
    <script src="<%= request.getContextPath() %>/js/script.js"></script>
</body>
</html>
