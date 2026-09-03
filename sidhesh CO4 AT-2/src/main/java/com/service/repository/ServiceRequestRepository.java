package com.service.repository;

import com.service.model.ServiceRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * ============================================================================
 * DATA REPOSITORY LAYER: ServiceRequestRepository.java
 * ============================================================================
 * Thread-safe singleton repository for saving, storing, and retrieving
 * submitted IT Service Requests across the application lifecycle.
 * ============================================================================
 */
public class ServiceRequestRepository {

    private static final ServiceRequestRepository instance = new ServiceRequestRepository();
    
    // Thread-safe collection for storing all submitted service requests
    private final List<ServiceRequest> storedRequests = new CopyOnWriteArrayList<>();

    private ServiceRequestRepository() {
        // Initialize with default demo/historical records
        storedRequests.add(new ServiceRequest(
                "SR-1001", "192521193", "John Doe", "Computer Science",
                "Software", "Unable to install and configure development SDKs.", "High"
        ));
        storedRequests.add(new ServiceRequest(
                "SR-1002", "EMP-10492", "Sarah Jenkins", "Software Engineering",
                "Network", "GlobalProtect VPN client fails authentication timeout error 504.", "High"
        ));
        storedRequests.add(new ServiceRequest(
                "SR-1003", "EMP-20815", "Michael Chang", "Information Technology",
                "Hardware", "Dual 4K secondary monitor docking station display output flickering.", "Medium"
        ));
    }

    public static ServiceRequestRepository getInstance() {
        return instance;
    }

    /**
     * Saves and stores a newly created ServiceRequest.
     *
     * @param request ServiceRequest Model instance
     */
    public void saveRequest(ServiceRequest request) {
        if (request != null) {
            storedRequests.add(0, request); // Insert at beginning (most recent first)
        }
    }

    /**
     * Returns an unmodifiable list of all stored requests.
     */
    public List<ServiceRequest> getAllRequests() {
        return Collections.unmodifiableList(new ArrayList<>(storedRequests));
    }

    /**
     * Returns the total count of stored requests.
     */
    public int getRequestCount() {
        return storedRequests.size();
    }
}
