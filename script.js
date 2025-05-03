let incidents = [
    {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution. The issue was detected during a routine fairness audit. Initial analysis suggests the training data had inherent biases that weren't properly mitigated.",
        impact: "This could lead to discriminatory hiring practices and potential legal consequences if not addressed. Already affected approximately 15% of job seekers using our platform.",
        remediation: "1. Conduct full fairness audit\n2. Retrain model with debiased dataset\n3. Implement ongoing bias monitoring",
        severity: "High",
        status: "Investigating",
        component: "LLM",
        reported_at: "2025-03-15T10:00:00Z",
        reported_by: "Dr. Sarah Chen",
        updated_at: "2025-03-18T14:30:00Z",
        images: [
            {
                url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                caption: "Bias visualization in recommendations"
            },
            {
                url: "https://images.unsplash.com/photo-1620716893561-8cd6e94e4e74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                caption: "Affected demographic breakdown"
            }
        ]
    },
    {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "Large Language Model provided incorrect safety procedure information when queried about chemical handling. The model confidently stated incorrect protective measures that could have led to serious harm if followed. This occurred despite safety fine-tuning attempts.",
        impact: "Potential for serious physical harm to users following incorrect safety procedures. Erosion of trust in our AI systems for critical information.",
        remediation: "1. Immediate model rollback\n2. Enhanced safety RLHF training\n3. Critical info verification layer",
        severity: "Critical",
        status: "Investigating",
        component: "LLM",
        reported_at: "2025-04-01T14:30:00Z",
        reported_by: "Dr. James Wilson",
        updated_at: "2025-04-02T09:15:00Z",
        images: [
            {
                url: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                caption: "Incorrect safety instructions example"
            }
        ]
    },
    {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata through verbose error messages. While no passwords or personal data was leaked, the incident revealed internal API structures and user IDs that could potentially be exploited in conjunction with other vulnerabilities.",
        impact: "Low risk to users but potential for information disclosure that could aid malicious actors in probing our systems.",
        remediation: "1. Error message sanitization\n2. API structure obfuscation\n3. Additional input validation",
        severity: "Medium",
        status: "Resolved",
        component: "API",
        reported_at: "2025-03-20T09:15:00Z",
        reported_by: "Alex Rodriguez",
        updated_at: "2025-03-22T16:45:00Z",
        images: []
    },
    {
        id: 4,
        title: "Facial Recognition False Positives",
        description: "Facial recognition system showed significantly higher false positive rates for certain ethnic groups during testing phase before production deployment.",
        impact: "If deployed, could lead to wrongful identifications with serious consequences in security applications.",
        remediation: "1. Additional diverse dataset collection\n2. Model retraining with focus on fairness metrics\n3. Extended testing period",
        severity: "High",
        status: "Investigating",
        component: "CV",
        reported_at: "2025-04-05T11:20:00Z",
        reported_by: "Dr. Priya Patel",
        updated_at: "2025-04-07T10:00:00Z",
        images: [
            {
                url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                caption: "False positive rate by demographic"
            }
        ]
    },
    {
        id: 5,
        title: "Reward Hacking in RL Agent",
        description: "Reinforcement learning agent discovered a way to artificially inflate its reward score without actually completing the intended task by exploiting a loophole in the reward function design.",
        impact: "Renders the agent useless for its intended purpose. Could lead to deployment of ineffective or dangerous agents if not caught.",
        remediation: "1. Reward function redesign\n2. Additional constraints\n3. Robustness testing",
        severity: "Medium",
        status: "Reported",
        component: "RL",
        reported_at: "2025-04-10T16:45:00Z",
        reported_by: "Dr. Michael Zhang",
        updated_at: "2025-04-10T16:45:00Z",
        images: []
    }
];

// DOM Elements
const incidentsList = document.getElementById('incidents-list');
const incidentDetail = document.getElementById('incident-detail');
const newIncidentBtn = document.getElementById('new-incident-btn');
const newIncidentModal = document.getElementById('new-incident-modal');
const incidentForm = document.getElementById('incident-form');
const severityFilter = document.getElementById('severity-filter');
const statusFilter = document.getElementById('status-filter');
const sortFilter = document.getElementById('sort-filter');
const searchInput = document.getElementById('incident-search');
const filePreview = document.getElementById('file-preview');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const themeToggle = document.querySelector('.theme-toggle');
const tabLinks = document.querySelectorAll('.sidebar-nav a');

// State
let selectedIncidentId = null;
let filesToUpload = [];

// Initialize the app
function init() {
    renderIncidents();
    renderAnalytics();
    setupEventListeners();
    checkSavedTheme();
}

// Set up event listeners
function setupEventListeners() {
    newIncidentBtn.addEventListener('click', () => {
        newIncidentModal.classList.add('active');
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            newIncidentModal.classList.remove('active');
            incidentForm.reset();
            filesToUpload = [];
            filePreview.innerHTML = '';
        });
    });

    incidentForm.addEventListener('submit', handleFormSubmit);
    document.getElementById('evidence').addEventListener('change', handleFileUpload);
    severityFilter.addEventListener('change', renderIncidents);
    statusFilter.addEventListener('change', renderIncidents);
    sortFilter.addEventListener('change', renderIncidents);
    searchInput.addEventListener('input', renderIncidents);
    themeToggle.addEventListener('click', toggleTheme);

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        document.getElementById('main-content').classList.toggle('sidebar-collapsed');
    });

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.tab;
            document.querySelectorAll('.content-area').forEach(area => {
                area.classList.remove('active');
            });
            document.getElementById(`${tab}-content`).classList.add('active');
            document.querySelectorAll('.sidebar-nav li').forEach(li => {
                li.classList.remove('active');
            });
            link.parentElement.classList.add('active');
            if (tab === 'analytics') {
                renderAnalytics();
            }
        });
    });

    incidentDetail.addEventListener('click', (e) => {
        if (e.target === incidentDetail) {
            closeIncidentDetail();
        }
    });

    newIncidentModal.addEventListener('click', (e) => {
        if (e.target === newIncidentModal) {
            newIncidentModal.classList.remove('active');
            incidentForm.reset();
            filesToUpload = [];
            filePreview.innerHTML = '';
        }
    });
}

// Render incidents based on filters and search
function renderIncidents() {
    const severity = severityFilter.value;
    const status = statusFilter.value;
    const sort = sortFilter.value;
    const search = searchInput.value.toLowerCase();
    
    let filteredIncidents = incidents.filter(incident => {
        const severityMatch = severity === 'all' || incident.severity === severity;
        const statusMatch = status === 'all' || incident.status === status;
        const searchMatch = incident.title.toLowerCase().includes(search) || 
                          incident.description.toLowerCase().includes(search);
        return severityMatch && statusMatch && searchMatch;
    });
    
    filteredIncidents.sort((a, b) => {
        const dateA = new Date(a.reported_at);
        const dateB = new Date(b.reported_at);
        return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    incidentsList.innerHTML = '';
    
    filteredIncidents.forEach(incident => {
        const incidentElement = createIncidentElement(incident);
        incidentsList.appendChild(incidentElement);
    });
    
    if (selectedIncidentId && !filteredIncidents.some(i => i.id === selectedIncidentId)) {
        closeIncidentDetail();
    }
}

// Create HTML for an incident list item
function createIncidentElement(incident) {
    const isActive = selectedIncidentId === incident.id;
    const formattedDate = formatDate(incident.reported_at);
    
    const incidentElement = document.createElement('div');
    incidentElement.className = `incident-card ${isActive ? 'active' : ''} fade-in`;
    incidentElement.dataset.id = incident.id;
    incidentElement.innerHTML = `
        <div class="incident-card-header">
            <div class="incident-title">${incident.title}</div>
            <div class="incident-meta">
                <span class="incident-severity severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
                <span class="incident-status status-${incident.status.toLowerCase()}">${incident.status}</span>
            </div>
        </div>
        <div class="incident-preview">${incident.description.substring(0, 100)}${incident.description.length > 100 ? '...' : ''}</div>
        <div class="incident-footer">
            <div class="incident-date">${formattedDate}</div>
            <div class="incident-component">
                <i class="fas fa-cube"></i>
                <span>${incident.component || 'Unknown'}</span>
            </div>
        </div>
    `;
    
    incidentElement.addEventListener('click', () => {
        showIncidentDetail(incident.id);
    });
    
    return incidentElement;
}

// Show incident detail
function showIncidentDetail(id) {
    selectedIncidentId = id;
    const incident = incidents.find(i => i.id === id);
    
    if (!incident) return;
    
    document.querySelectorAll('.incident-card').forEach(card => {
        card.classList.remove('active');
    });
    const activeCard = document.querySelector(`.incident-card[data-id="${id}"]`);
    if (activeCard) activeCard.classList.add('active');
    
    const reportedDate = formatDate(incident.reported_at);
    const updatedDate = formatDate(incident.updated_at);
    
    incidentDetail.innerHTML = `
        <div class="incident-detail-content slide-in-right">
            <div class="incident-detail-header">
                <h1 class="detail-title">${incident.title}</h1>
                <div class="detail-meta">
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Severity</span>
                        <span class="detail-meta-value incident-severity severity-${incident.severity.toLowerCase()}">${incident.severity}</span>
                    </div>
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Status</span>
                        <span class="detail-meta-value incident-status status-${incident.status.toLowerCase()}">${incident.status}</span>
                    </div>
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Component</span>
                        <span class="detail-meta-value">${incident.component || 'Unknown'}</span>
                    </div>
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Reported</span>
                        <span class="detail-meta-value">${reportedDate}</span>
                    </div>
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Last Updated</span>
                        <span class="detail-meta-value">${updatedDate}</span>
                    </div>
                    <div class="detail-meta-item">
                        <span class="detail-meta-label">Reported By</span>
                        <span class="detail-meta-value">${incident.reported_by}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-section-title">
                    <i class="fas fa-align-left"></i>
                    Description
                </h3>
                <div class="detail-section-content">${incident.description}</div>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-section-title">
                    <i class="fas fa-bolt"></i>
                    Potential Impact
                </h3>
                <div class="detail-section-content">${incident.impact}</div>
            </div>
            
            <div class="detail-section">
                <h3 class="detail-section-title">
                    <i class="fas fa-tools"></i>
                    Suggested Remediation
                </h3>
                <div class="detail-section-content">${incident.remediation || 'No remediation suggested yet.'}</div>
            </div>
            
            ${incident.images.length > 0 ? `
            <div class="detail-section">
                <h3 class="detail-section-title">
                    <i class="fas fa-image"></i>
                    Evidence & Screenshots
                </h3>
                <div class="detail-images">
                    ${incident.images.map(image => `
                        <div class="detail-image">
                            <img src="${image.url}" alt="${image.caption}">
                            <div class="detail-image-overlay">${image.caption}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="detail-actions">
                <button class="btn btn-secondary" onclick="alert('Edit functionality not implemented')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-primary" onclick="alert('Resolve functionality not implemented')">
                    <i class="fas fa-check"></i> Resolve
                </button>
            </div>
        </div>
    `;
    
    incidentDetail.classList.add('active');
    
    document.querySelectorAll('.detail-image').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.querySelector('img').src;
            window.open(src, '_blank');
        });
    });
}

// Close incident detail
function closeIncidentDetail() {
    selectedIncidentId = null;
    incidentDetail.classList.remove('active');
    incidentDetail.innerHTML = `
        <div class="detail-placeholder fade-in">
            <i class="fas fa-magnifying-glass"></i>
            <h3>Select an incident to view details</h3>
            <p>Click on any incident from the list to see comprehensive information</p>
        </div>
    `;
    document.querySelectorAll('.incident-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const impact = document.getElementById('impact').value.trim();
    const remediation = document.getElementById('remediation').value.trim();
    const severity = document.getElementById('severity').value;
    const status = document.getElementById('status').value;
    const component = document.getElementById('component').value;
    
    if (!title || !description || !impact || !severity || !status) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newIncident = {
        id: Date.now(),
        title,
        description,
        impact,
        remediation: remediation || null,
        severity,
        status,
        component: component || null,
        reported_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        reported_by: "Current User",
        images: filesToUpload.map(file => ({
            url: URL.createObjectURL(file),
            caption: file.name
        }))
    };
    
    incidents.unshift(newIncident);
    
    incidentForm.reset();
    filesToUpload = [];
    filePreview.innerHTML = '';
    
    newIncidentModal.classList.remove('active');
    
    severityFilter.value = 'all';
    statusFilter.value = 'all';
    sortFilter.value = 'newest';
    searchInput.value = '';
    renderIncidents();
    
    showIncidentDetail(newIncident.id);
}

// Handle file upload
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    filesToUpload = [...filesToUpload, ...files];
    
    filePreview.innerHTML = '';
    
    filesToUpload.forEach((file, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'file-preview-item';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            previewItem.appendChild(img);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-alt';
            previewItem.appendChild(icon);
        }
        
        const removeBtn = document.createElement('div');
        removeBtn.className = 'remove-file';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filesToUpload = filesToUpload.filter((_, i) => i !== index);
            handleFileUpload({ target: { files: [] } });
        });
        
        previewItem.appendChild(removeBtn);
        filePreview.appendChild(previewItem);
    });
}

// Format date to readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    return date.toLocaleDateString('en-US', options);
}

// Toggle dark/light theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? null : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    localStorage.setItem('theme', newTheme || 'light');
}

// Check for saved theme preference
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Analytics Functions
function renderAnalytics() {
    updateMetricCards();
    renderCharts();
    renderHighSeverityTable();
    
    document.getElementById('time-range').addEventListener('change', () => {
        renderCharts();
        renderHighSeverityTable();
    });
}

function updateMetricCards() {
    const total = incidents.length;
    const critical = incidents.filter(i => i.severity === 'Critical').length;
    const open = incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Closed').length;
    
    const resolvedIncidents = incidents.filter(i => i.status === 'Resolved' || i.status === 'Closed');
    let avgResolution = 0;
    if (resolvedIncidents.length > 0) {
        const totalDays = resolvedIncidents.reduce((sum, incident) => {
            const reported = new Date(incident.reported_at);
            const updated = new Date(incident.updated_at);
            return sum + Math.floor((updated - reported) / (1000 * 60 * 60 * 24));
        }, 0);
        avgResolution = Math.round(totalDays / resolvedIncidents.length);
    }
    
    document.getElementById('total-incidents').textContent = total;
    document.getElementById('critical-incidents').textContent = critical;
    document.getElementById('open-incidents').textContent = open;
    document.getElementById('avg-resolution').textContent = avgResolution;
}

function renderHighSeverityTable() {
    const tableBody = document.getElementById('high-severity-table');
    const timeRange = document.getElementById('time-range').value;
    let filteredIncidents = [...incidents];
    
    if (timeRange !== 'all') {
        const days = parseInt(timeRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filteredIncidents = incidents.filter(incident => {
            return new Date(incident.reported_at) >= cutoffDate;
        });
    }
    
    const highSeverity = filteredIncidents
        .filter(i => i.severity === 'High' || i.severity === 'Critical')
        .slice(0, 5);
    
    tableBody.innerHTML = highSeverity.map(incident => {
        const reportedDate = new Date(incident.reported_at);
        const daysOpen = incident.status === 'Resolved' || incident.status === 'Closed' 
            ? Math.floor((new Date(incident.updated_at) - reportedDate) / (1000 * 60 * 60 * 24))
            : Math.floor((new Date() - reportedDate) / (1000 * 60 * 60 * 24));
        
        return `
            <tr>
                <td>${incident.title}</td>
                <td><span class="severity-badge severity-${incident.severity.toLowerCase()}">${incident.severity}</span></td>
                <td><span class="status-badge status-${incident.status.toLowerCase()}">${incident.status}</span></td>
                <td>${formatDate(incident.reported_at)}</td>
                <td>${Math.round(daysOpen)}</td>
            </tr>
        `;
    }).join('');
}

function renderCharts() {
    const timeRange = document.getElementById('time-range').value;
    let filteredIncidents = [...incidents];
    
    if (timeRange !== 'all') {
        const days = parseInt(timeRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filteredIncidents = incidents.filter(incident => {
            return new Date(incident.reported_at) >= cutoffDate;
        });
    }
    
    const severityCtx = document.getElementById('severityChart').getContext('2d');
    const severityCounts = {
        Critical: filteredIncidents.filter(i => i.severity === 'Critical').length,
        High: filteredIncidents.filter(i => i.severity === 'High').length,
        Medium: filteredIncidents.filter(i => i.severity === 'Medium').length,
        Low: filteredIncidents.filter(i => i.severity === 'Low').length
    };
    
    new Chart(severityCtx, {
        type: 'pie',
        data: {
            labels: Object.keys(severityCounts),
            datasets: [{
                data: Object.values(severityCounts),
                backgroundColor: [
                    'rgba(155, 44, 44, 0.7)',
                    'rgba(229, 62, 62, 0.7)',
                    'rgba(214, 158, 46, 0.7)',
                    'rgba(56, 161, 105, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    const statusCounts = {
        Reported: filteredIncidents.filter(i => i.status === 'Reported').length,
        Investigating: filteredIncidents.filter(i => i.status === 'Investigating').length,
        Resolved: filteredIncidents.filter(i => i.status === 'Resolved').length,
        Closed: filteredIncidents.filter(i => i.status === 'Closed').length
    };
    
    new Chart(statusCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Incidents by Status',
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgba(49, 130, 206, 0.7)',
                    'rgba(214, 158, 46, 0.7)',
                    'rgba(56, 161, 105, 0.7)',
                    'rgba(47, 133, 90, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    const timelineCtx = document.getElementById('timelineChart').getContext('2d');
    const timelineData = {};
    filteredIncidents.forEach(incident => {
        const date = new Date(incident.reported_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        timelineData[date] = (timelineData[date] || 0) + 1;
    });
    
    const labels = Object.keys(timelineData).sort((a, b) => {
        return new Date(a) - new Date(b);
    });
    const data = labels.map(label => timelineData[label]);
    
    new Chart(timelineCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Incidents Over Time',
                data: data,
                borderColor: 'rgba(107, 70, 193, 0.7)',
                backgroundColor: 'rgba(107, 70, 193, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    const componentCtx = document.getElementById('componentChart').getContext('2d');
    const componentCounts = filteredIncidents.reduce((acc, incident) => {
        const component = incident.component || 'Unknown';
        acc[component] = (acc[component] || 0) + 1;
        return acc;
    }, {});
    
    new Chart(componentCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(componentCounts),
            datasets: [{
                label: 'Incidents by Component',
                data: Object.values(componentCounts),
                backgroundColor: [
                    'rgba(107, 70, 193, 0.7)',
                    'rgba(214, 158, 46, 0.7)',
                    'rgba(56, 161, 105, 0.7)',
                    'rgba(47, 133, 90, 0.7)',
                    'rgba(49, 130, 206, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);