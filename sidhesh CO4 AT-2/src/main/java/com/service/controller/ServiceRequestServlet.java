package com.service.controller;

import com.service.model.ServiceRequest;
import com.service.repository.ServiceRequestRepository;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ============================================================================
 * CONTROLLER COMPONENT: ServiceRequestServlet.java
 * ============================================================================
 * Acts as the central controller in the MVC architecture.
 *
 * Responsibilities:
 * 1. Receives HTTP POST requests submitted from serviceRequest.jsp.
 * 2. Extracts form parameters using request.getParameter().
 * 3. Trims whitespace and performs rigorous server-side validation.
 * 4. In case of validation failure:
 *    - Re-attaches error messages and submitted data to request attributes.
 *    - Forwards back to serviceRequest.jsp without creating the Model object.
 * 5. In case of successful validation:
 *    - Instantiates the ServiceRequest Model object.
 *    - Generates a unique service request identifier (e.g. SR-1004).
 *    - Saves and stores the request into ServiceRequestRepository.
 *    - Sets the Model and Request Number as request attributes.
 *    - Forwards the request and response to acknowledgement.jsp.
 * ============================================================================
 */
@WebServlet(name = "ServiceRequestServlet", urlPatterns = {"/ServiceRequestServlet", "/submit-request"})
public class ServiceRequestServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // Atomic counter for unique sequential ticket IDs
    private static final AtomicInteger requestCounter = new AtomicInteger(1003);

    /**
     * Handles HTTP GET requests.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<ServiceRequest> storedList = ServiceRequestRepository.getInstance().getAllRequests();
        request.setAttribute("storedRequests", storedList);
        request.getRequestDispatcher("/serviceRequest.jsp").forward(request, response);
    }

    /**
     * Handles HTTP POST requests submitted by the service request form.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        // 1. Read submitted parameters
        String employeeId = request.getParameter("employeeId");
        String employeeName = request.getParameter("employeeName");
        String department = request.getParameter("department");
        String problemCategory = request.getParameter("problemCategory");
        String problemDescription = request.getParameter("problemDescription");
        String priority = request.getParameter("priority");

        // Trim whitespace
        employeeId = (employeeId != null) ? employeeId.trim() : "";
        employeeName = (employeeName != null) ? employeeName.trim() : "";
        department = (department != null) ? department.trim() : "";
        problemCategory = (problemCategory != null) ? problemCategory.trim() : "";
        problemDescription = (problemDescription != null) ? problemDescription.trim() : "";
        priority = (priority != null) ? priority.trim() : "";

        // 2. Comprehensive Server-Side Validation
        Map<String, String> fieldErrors = new HashMap<>();

        if (employeeId.isEmpty()) {
            fieldErrors.put("employeeId", "Employee ID is mandatory.");
        } else if (!employeeId.matches("^[a-zA-Z0-9\\-_]{2,20}$")) {
            fieldErrors.put("employeeId", "Employee ID must be 2-20 alphanumeric characters.");
        }

        if (employeeName.isEmpty()) {
            fieldErrors.put("employeeName", "Employee Name is mandatory.");
        } else if (employeeName.length() < 2 || employeeName.length() > 60) {
            fieldErrors.put("employeeName", "Employee Name must be between 2 and 60 characters.");
        }

        if (department.isEmpty()) {
            fieldErrors.put("department", "Please select your department.");
        }

        if (problemCategory.isEmpty()) {
            fieldErrors.put("problemCategory", "Please select a problem category.");
        }

        if (problemDescription.isEmpty()) {
            fieldErrors.put("problemDescription", "Problem description is mandatory.");
        } else if (problemDescription.length() < 10) {
            fieldErrors.put("problemDescription", "Please provide a detailed description (minimum 10 characters).");
        }

        if (priority.isEmpty()) {
            fieldErrors.put("priority", "Please select a priority level.");
        }

        // 3. Handle Validation Failure
        if (!fieldErrors.isEmpty()) {
            request.setAttribute("errorMessage", "Please complete all required fields correctly before submitting.");
            request.setAttribute("fieldErrors", fieldErrors);

            request.setAttribute("prevEmployeeId", employeeId);
            request.setAttribute("prevEmployeeName", employeeName);
            request.setAttribute("prevDepartment", department);
            request.setAttribute("prevProblemCategory", problemCategory);
            request.setAttribute("prevProblemDescription", problemDescription);
            request.setAttribute("prevPriority", priority);

            request.setAttribute("storedRequests", ServiceRequestRepository.getInstance().getAllRequests());
            request.getRequestDispatcher("/serviceRequest.jsp").forward(request, response);
            return;
        }

        // 4. Generate Unique Request Number
        int nextId = requestCounter.incrementAndGet();
        String requestNumber = "SR-" + nextId;

        // 5. Instantiate the ServiceRequest Model Object
        ServiceRequest serviceRequest = new ServiceRequest(
                requestNumber,
                employeeId,
                employeeName,
                department,
                problemCategory,
                problemDescription,
                priority
        );

        // 6. SAVE AND STORE the request in Repository
        ServiceRequestRepository.getInstance().saveRequest(serviceRequest);

        // 7. Store Request Attributes
        request.setAttribute("serviceRequest", serviceRequest);
        request.setAttribute("requestNumber", requestNumber);
        request.setAttribute("storedRequests", ServiceRequestRepository.getInstance().getAllRequests());

        // 8. Forward to acknowledgement.jsp
        request.getRequestDispatcher("/acknowledgement.jsp").forward(request, response);
    }
}
