<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.service.model.ServiceRequest" %>
<%@ page import="com.service.repository.ServiceRequestRepository" %>
<%@ page import="java.util.List" %>
<%
    // Retrieve Model object and Request Number from request attributes
    ServiceRequest serviceRequest = (ServiceRequest) request.getAttribute("serviceRequest");
    String requestNumber = (String) request.getAttribute("requestNumber");

    @SuppressWarnings("unchecked")
    List<ServiceRequest> storedList = (List<ServiceRequest>) request.getAttribute("storedRequests");
    if (storedList == null) {
        storedList = ServiceRequestRepository.getInstance().getAllRequests();
    }

    boolean hasData = (serviceRequest != null);
    if (!hasData) {
        requestNumber = "N/A";
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Service Request Saved | Enterprise IT Portal</title>
    <meta name="description" content="Official confirmation and repository storage receipt for submitted IT service ticket.">
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
                    Ticket Saved &amp; Stored in Database
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content Container -->
    <main class="main-wrapper">

        <% if (hasData) { %>
            <!-- Acknowledgement & Confirmation Card -->
            <section class="ack-card">
                
                <!-- Radiant Success Banner -->
                <div class="ack-banner">
                    <div class="success-icon-wrap">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2>✓ Request Successfully Saved &amp; Stored</h2>
                    <p>Your technical service request has been committed to the repository and assigned to the queue.</p>
                    
                    <div class="ticket-number-pill">
                        <span>Ticket: <%= requestNumber %></span>
                        <button type="button" id="btnCopyTicket" class="copy-btn" data-ticket="<%= requestNumber %>" title="Copy Ticket Number">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            <span class="copy-label">Copy</span>
                        </button>
                    </div>
                </div>

                <!-- Ticket Details Summary -->
                <div class="ack-body">
                    <div class="summary-heading">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet)" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Service Request Summary Details
                    </div>

                    <table class="summary-table">
                        <tbody>
                            <tr>
                                <th>Service Request No.</th>
                                <td><strong style="font-family: var(--font-mono); color: var(--color-violet); font-size: 1.15rem;"><%= serviceRequest.getRequestNumber() != null ? serviceRequest.getRequestNumber() : requestNumber %></strong></td>
                            </tr>
                            <tr>
                                <th>Employee ID</th>
                                <td><strong><%= serviceRequest.getEmployeeId() %></strong></td>
                            </tr>
                            <tr>
                                <th>Employee Name</th>
                                <td><%= serviceRequest.getEmployeeName() %></td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td><%= serviceRequest.getDepartment() %></td>
                            </tr>
                            <tr>
                                <th>Problem Category</th>
                                <td>
                                    <span class="badge badge-category">
                                        <%= serviceRequest.getProblemCategory() %>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Priority Level</th>
                                <td>
                                    <% 
                                        String prio = serviceRequest.getPriority();
                                        String badgeClass = "badge-medium";
                                        if ("Low".equalsIgnoreCase(prio)) badgeClass = "badge-low";
                                        else if ("High".equalsIgnoreCase(prio)) badgeClass = "badge-high";
                                    %>
                                    <span class="badge <%= badgeClass %>">
                                        ● <%= prio %> Priority
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Storage Status</th>
                                <td>
                                    <span class="badge badge-status">
                                        ✓ Saved &amp; Stored in Repository
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Logged Timestamp</th>
                                <td style="color: var(--color-slate-600); font-size: 0.9rem;">
                                    <%= serviceRequest.getSubmissionDate() %>
                                </td>
                            </tr>
                            <tr>
                                <th>Problem Description</th>
                                <td>
                                    <div class="desc-box"><%= serviceRequest.getProblemDescription() %></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Action Buttons -->
                    <div class="form-actions" style="margin-top: 1rem;">
                        <button type="button" id="btnPrintTicket" class="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            Print Summary
                        </button>
                        <a href="<%= request.getContextPath() %>/serviceRequest.jsp" class="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Submit Another Request
                        </a>
                    </div>
                </div>
            </section>

            <!-- All Stored Requests Repository Section -->
            <section class="live-queue-card">
                <div class="live-queue-header">
                    <div class="live-queue-title">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-violet)" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        All Saved &amp; Stored Requests in Repository (<%= storedList.size() %> Total)
                    </div>
                    <span class="badge badge-status">✓ Persistent Storage</span>
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
                        <% for (ServiceRequest reqItem : storedList) { %>
                            <tr>
                                <td><strong style="font-family: var(--font-mono); color: var(--color-violet);"><%= reqItem.getRequestNumber() %></strong></td>
                                <td><strong><%= reqItem.getEmployeeName() %></strong><br><small style="color: var(--color-slate-500);"><%= reqItem.getEmployeeId() %></small></td>
                                <td><%= reqItem.getDepartment() %></td>
                                <td><span class="badge badge-category"><%= reqItem.getProblemCategory() %></span></td>
                                <td>
                                    <% 
                                        String rPrio = reqItem.getPriority();
                                        String rBadge = "badge-medium";
                                        if ("Low".equalsIgnoreCase(rPrio)) rBadge = "badge-low";
                                        else if ("High".equalsIgnoreCase(rPrio)) rBadge = "badge-high";
                                    %>
                                    <span class="badge <%= rBadge %>">● <%= rPrio %></span>
                                </td>
                                <td><span class="badge badge-status"><%= reqItem.getStatus() %></span></td>
                            </tr>
                        <% } %>
                    </tbody>
                </table>
            </section>

        <% } else { %>

            <!-- Fallback if navigated directly -->
            <section class="card" style="max-width: 680px; margin: 3rem auto; text-align: center;">
                <div class="card-body" style="padding: 3rem 2.5rem;">
                    <div style="width: 60px; height: 60px; background-color: var(--color-primary-50); color: var(--color-purple); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    </div>
                    <h3 style="font-size: 1.4rem; color: var(--color-slate-900); margin-bottom: 0.5rem; font-weight: 800;">No Active Service Request</h3>
                    <p style="color: var(--color-slate-600); margin-bottom: 1.75rem; font-size: 0.95rem;">
                        To view your ticket confirmation, please submit a service request through the portal form.
                    </p>
                    <a href="<%= request.getContextPath() %>/serviceRequest.jsp" class="btn btn-primary">
                        Go to Service Request Form
                    </a>
                </div>
            </section>

        <% } %>

        <!-- MVC ARCHITECTURE EXPLANATION SECTION -->
        <section class="mvc-section">
            <div class="mvc-header">
                <h3>How the MVC Architecture Works with Storage</h3>
                <p>A transparent breakdown of how Model-View-Controller handles and stores requests</p>
            </div>

            <!-- Workflow Diagram -->
            <div class="mvc-diagram">
                <div class="mvc-step-card">
                    <div class="mvc-step-num">1</div>
                    <div class="mvc-step-title">Employee</div>
                    <div class="mvc-step-desc">Fills out form in browser</div>
                </div>

                <div class="mvc-arrow">→</div>

                <div class="mvc-step-card">
                    <div class="mvc-step-num">2</div>
                    <div class="mvc-step-title">View (JSP)</div>
                    <div class="mvc-step-desc"><code>serviceRequest.jsp</code> submits POST</div>
                </div>

                <div class="mvc-arrow">→</div>

                <div class="mvc-step-card">
                    <div class="mvc-step-num">3</div>
                    <div class="mvc-step-title">Controller</div>
                    <div class="mvc-step-desc"><code>ServiceRequestServlet</code> validates input</div>
                </div>

                <div class="mvc-arrow">→</div>

                <div class="mvc-step-card">
                    <div class="mvc-step-num">4</div>
                    <div class="mvc-step-title">Model &amp; Storage</div>
                    <div class="mvc-step-desc">Creates <code>ServiceRequest</code> &amp; saves to repository</div>
                </div>

                <div class="mvc-arrow">→</div>

                <div class="mvc-step-card">
                    <div class="mvc-step-num">5</div>
                    <div class="mvc-step-title">View (JSP)</div>
                    <div class="mvc-step-desc"><code>acknowledgement.jsp</code> displays ticket &amp; log</div>
                </div>
            </div>

            <!-- MVC Role Detail Cards -->
            <div class="mvc-roles-grid">
                <div class="mvc-role-card">
                    <span class="mvc-role-tag model">Model Layer</span>
                    <h4>ServiceRequest.java &amp; Repository</h4>
                    <p>
                        Encapsulates business data representation and state persistence. Stores tickets with ticket numbers, timestamps, and status flags.
                    </p>
                </div>

                <div class="mvc-role-card">
                    <span class="mvc-role-tag view">View Layer</span>
                    <h4>serviceRequest.jsp &amp; acknowledgement.jsp</h4>
                    <p>
                        Handles presentation and user interaction. Renders the submission form, displays server validation feedback, and outputs formatted ticket attributes and repository history.
                    </p>
                </div>

                <div class="mvc-role-card">
                    <span class="mvc-role-tag controller">Controller Layer</span>
                    <h4>ServiceRequestServlet.java</h4>
                    <p>
                        Processes HTTP POST requests, extracts parameters, validates all fields, generates unique ticket numbers, saves to repository, binds request attributes, and forwards execution.
                    </p>
                </div>
            </div>
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
