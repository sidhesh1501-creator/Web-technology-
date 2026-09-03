<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Automatically redirect entry root to the service request form
    response.sendRedirect(request.getContextPath() + "/serviceRequest.jsp");
%>
