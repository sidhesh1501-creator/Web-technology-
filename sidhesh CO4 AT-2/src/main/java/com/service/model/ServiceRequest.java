package com.service.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * ============================================================================
 * MODEL COMPONENT: ServiceRequest.java
 * ============================================================================
 * Represents the data structure for an IT Service Request in the application.
 * Follows JavaBeans standard conventions (private fields, default constructor,
 * parameterized constructor, getters and setters).
 *
 * This Model component ONLY manages data representation and business state.
 * It contains NO presentation (HTML/JSP) or request-processing logic.
 * ============================================================================
 */
public class ServiceRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    // Core fields specified in the requirements
    private String employeeId;
    private String employeeName;
    private String department;
    private String problemCategory;
    private String problemDescription;
    private String priority;

    // Additional helper fields for complete enterprise tracking
    private String requestNumber;
    private String submissionDate;
    private String status;

    /**
     * Default No-Argument Constructor (JavaBeans Standard)
     */
    public ServiceRequest() {
        this.status = "Open / Assigned to IT Queue";
        this.submissionDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    /**
     * Parameterized Constructor with Core Fields
     *
     * @param employeeId         Unique identifier of the employee
     * @param employeeName       Full name of the employee
     * @param department         Department to which the employee belongs
     * @param problemCategory    Category of the IT issue (Network, Software, Hardware, Account, Other)
     * @param problemDescription Detailed explanation of the technical problem
     * @param priority           Urgency level (Low, Medium, High)
     */
    public ServiceRequest(String employeeId, String employeeName, String department,
                          String problemCategory, String problemDescription, String priority) {
        this();
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.department = department;
        this.problemCategory = problemCategory;
        this.problemDescription = problemDescription;
        this.priority = priority;
    }

    /**
     * Full Parameterized Constructor including generated Request Number
     *
     * @param requestNumber      Unique ticket tracking ID (e.g., SR-1001)
     * @param employeeId         Unique identifier of the employee
     * @param employeeName       Full name of the employee
     * @param department         Department of the employee
     * @param problemCategory    Category of technical problem
     * @param problemDescription Detailed problem description
     * @param priority           Urgency priority
     */
    public ServiceRequest(String requestNumber, String employeeId, String employeeName,
                          String department, String problemCategory,
                          String problemDescription, String priority) {
        this(employeeId, employeeName, department, problemCategory, problemDescription, priority);
        this.requestNumber = requestNumber;
    }

    // ========================================================================
    // GETTERS AND SETTERS
    // ========================================================================

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getProblemCategory() {
        return problemCategory;
    }

    public void setProblemCategory(String problemCategory) {
        this.problemCategory = problemCategory;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public String getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(String submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ServiceRequest{" +
                "requestNumber='" + requestNumber + '\'' +
                ", employeeId='" + employeeId + '\'' +
                ", employeeName='" + employeeName + '\'' +
                ", department='" + department + '\'' +
                ", problemCategory='" + problemCategory + '\'' +
                ", problemDescription='" + problemDescription + '\'' +
                ", priority='" + priority + '\'' +
                ", status='" + status + '\'' +
                ", submissionDate='" + submissionDate + '\'' +
                '}';
    }
}
