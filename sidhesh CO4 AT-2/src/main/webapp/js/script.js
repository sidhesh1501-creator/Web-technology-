/**
 * ============================================================================
 * IT SERVICE REQUEST MANAGEMENT SYSTEM - STORAGE & INTERACTION SCRIPT
 * ============================================================================
 * Manages form interactions, live validation hints, demo data autofill,
 * and PERSISTENT STORAGE of all submitted service tickets (via localStorage).
 * ============================================================================
 */

const STORAGE_KEY = "it_service_portal_requests";

// Default seed requests if storage is empty
const defaultSeedRequests = [
    {
        ticketNum: "SR-1001",
        empId: "192521193",
        name: "John Doe",
        dept: "Computer Science",
        cat: "Software",
        prio: "High",
        desc: "Unable to install and configure development SDKs.",
        status: "Assigned / In Progress",
        timestamp: "2026-09-03 10:15:00"
    },
    {
        ticketNum: "SR-1002",
        empId: "EMP-10492",
        name: "Sarah Jenkins",
        dept: "Software Engineering",
        cat: "Network",
        prio: "High",
        desc: "GlobalProtect VPN client fails authentication timeout error 504.",
        status: "Resolved",
        timestamp: "2026-09-03 10:45:00"
    },
    {
        ticketNum: "SR-1003",
        empId: "EMP-20815",
        name: "Michael Chang",
        dept: "Information Technology",
        cat: "Hardware",
        prio: "Medium",
        desc: "Dual 4K secondary monitor docking station display output flickering.",
        status: "Under Review",
        timestamp: "2026-09-03 11:20:00"
    }
];

// Helper to get stored requests
function getStoredRequests() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSeedRequests));
            return defaultSeedRequests;
        }
        return JSON.parse(data);
    } catch (e) {
        return defaultSeedRequests;
    }
}

// Helper to save a new request
function saveNewRequestToStorage(newReq) {
    const list = getStoredRequests();
    list.unshift(newReq); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderQueueTable();
}

// Render dynamic queue table
function renderQueueTable() {
    const tbody = document.getElementById("queueTableBody");
    const countEl = document.getElementById("storedCountBadge");
    if (!tbody) return;

    const list = getStoredRequests();
    if (countEl) countEl.textContent = `${list.length} Requests Stored`;

    tbody.innerHTML = "";
    list.forEach(item => {
        const tr = document.createElement("tr");
        
        let prioBadgeClass = "badge-medium";
        if (item.prio === "Low") prioBadgeClass = "badge-low";
        else if (item.prio === "High") prioBadgeClass = "badge-high";

        tr.innerHTML = `
            <td><strong style="font-family: var(--font-mono); color: var(--color-violet); font-size: 0.95rem;">${item.ticketNum}</strong></td>
            <td><strong>${item.name}</strong><br><small style="color: var(--color-slate-500);">${item.empId}</small></td>
            <td>${item.dept}</td>
            <td><span class="badge badge-category">${item.cat}</span></td>
            <td><span class="badge ${prioBadgeClass}">● ${item.prio}</span></td>
            <td><span class="badge badge-status">${item.status || "Open / Queued"}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", function () {

    // Initialize Table from Persistent Storage
    renderQueueTable();

    // 1. Character Counter
    const descInput = document.getElementById("problemDescription");
    const charCounter = document.getElementById("descCharCount");

    if (descInput && charCounter) {
        const updateCharCount = () => {
            const currentLen = descInput.value.length;
            charCounter.textContent = `${currentLen} characters (min. 10)`;
            if (currentLen > 0 && currentLen < 10) {
                charCounter.style.color = "var(--color-rose)";
            } else {
                charCounter.style.color = "var(--color-slate-500)";
            }
        };

        descInput.addEventListener("input", updateCharCount);
        updateCharCount();
    }

    // 2. Smooth Scroll CTA
    const scrollToFormBtn = document.getElementById("btnScrollToForm");
    if (scrollToFormBtn) {
        scrollToFormBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const targetElement = document.getElementById("requestFormCard");
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                const firstField = document.getElementById("employeeId");
                if (firstField) firstField.focus();
            }
        });
    }

    // 3. Demo Templates & Auto-Fill Data
    const demoTemplates = {
        vpn: {
            empId: "EMP-10492",
            name: "Sarah Jenkins",
            dept: "Software Engineering",
            cat: "Network",
            prio: "High",
            desc: "GlobalProtect VPN client fails authentication with timeout error code 504 on remote subnet 192.168.4.x."
        },
        software: {
            empId: "192521193",
            name: "John Doe",
            dept: "Computer Science",
            cat: "Software",
            prio: "High",
            desc: "Unable to install and configure required IntelliJ IDEA Enterprise SDK and local Docker development container."
        },
        hardware: {
            empId: "EMP-20815",
            name: "Michael Chang",
            dept: "Information Technology",
            cat: "Hardware",
            prio: "Medium",
            desc: "Dual 4K secondary monitor docking station display output is flickering intermittently after USB-C driver update."
        },
        account: {
            empId: "EMP-30421",
            name: "Emily Rodriguez",
            dept: "Human Resources",
            cat: "Account",
            prio: "Medium",
            desc: "Single Sign-On (SSO) multi-factor authentication token expired and requires security credential re-provisioning."
        }
    };

    function populateFormWithData(data) {
        const empIdEl = document.getElementById("employeeId");
        const empNameEl = document.getElementById("employeeName");
        const deptEl = document.getElementById("department");
        const descEl = document.getElementById("problemDescription");

        if (empIdEl) empIdEl.value = data.empId;
        if (empNameEl) empNameEl.value = data.name;
        if (deptEl) deptEl.value = data.dept;
        if (descEl) {
            descEl.value = data.desc;
            if (charCounter) charCounter.textContent = `${data.desc.length} characters (min. 10)`;
        }

        const catRadio = document.querySelector(`input[name="problemCategory"][value="${data.cat}"]`);
        if (catRadio) catRadio.checked = true;

        const prioRadio = document.querySelector(`input[name="priority"][value="${data.prio}"]`);
        if (prioRadio) prioRadio.checked = true;

        const formCard = document.getElementById("requestFormCard");
        if (formCard) {
            formCard.style.transition = "box-shadow 0.3s ease";
            formCard.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.4)";
            setTimeout(() => { formCard.style.boxShadow = ""; }, 600);
            formCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    const btnAutoFill = document.getElementById("btnAutoFillDemo");
    if (btnAutoFill) {
        btnAutoFill.addEventListener("click", function () {
            populateFormWithData(demoTemplates.software);
        });
    }

    document.querySelectorAll(".chip-template").forEach(chip => {
        chip.addEventListener("click", function () {
            const templateKey = this.getAttribute("data-template");
            if (demoTemplates[templateKey]) {
                populateFormWithData(demoTemplates[templateKey]);
            }
        });
    });

    // 4. Reset Button Confirmation
    const resetBtn = document.getElementById("btnResetForm");
    const requestForm = document.getElementById("serviceRequestForm");
    if (resetBtn && requestForm) {
        resetBtn.addEventListener("click", function (e) {
            const hasData = Array.from(requestForm.elements).some(el => {
                return (el.type === "text" || el.tagName === "TEXTAREA") && el.value.trim() !== "";
            });
            if (hasData) {
                const confirmed = confirm("Clear all fields in this form?");
                if (!confirmed) {
                    e.preventDefault();
                } else {
                    setTimeout(() => {
                        if (charCounter) charCounter.textContent = "0 characters (min. 10)";
                    }, 50);
                }
            }
        });
    }

    // 5. Copy Request Number
    const copyBtn = document.getElementById("btnCopyTicket");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            const ticketText = this.getAttribute("data-ticket");
            if (ticketText && navigator.clipboard) {
                navigator.clipboard.writeText(ticketText).then(() => {
                    const label = this.querySelector(".copy-label");
                    if (label) label.textContent = "Copied! ✓";
                    setTimeout(() => {
                        if (label) label.textContent = "Copy";
                    }, 2000);
                }).catch(() => {
                    prompt("Your Service Request Number:", ticketText);
                });
            }
        });
    }

    // 6. Export Saved Requests to JSON
    const btnExport = document.getElementById("btnExportJSON");
    if (btnExport) {
        btnExport.addEventListener("click", function () {
            const list = getStoredRequests();
            const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", jsonStr);
            downloadAnchor.setAttribute("download", "IT_Service_Requests_Export.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
    }

    // 7. Print Ticket Summary
    const printBtn = document.getElementById("btnPrintTicket");
    if (printBtn) {
        printBtn.addEventListener("click", function () {
            window.print();
        });
    }
});
