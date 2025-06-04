// Dashboard data from the provided JSON
const dashboardData = {
  report_info: {
    title: "Monthly Amazon Report Summary",
    period: "May 1-31, 2025",
    comparison_period: "May 1-31, 2024",
    generated_date: "June 2, 2025",
    prepared_by: "NSG Amazon Account Management"
  },
  
  key_metrics: {
    "Gross Revenue": {
      may_2025: 132313.88,
      may_2024: 120276.18,
      change: 12037.70,
      percent_change: 10.0
    },
    "Net Profit": {
      may_2025: 83993.07,
      may_2024: 89251.50,
      change: -5258.43,
      percent_change: -5.9
    },
    "Units Sold": {
      may_2025: 4059,
      may_2024: 3653,
      change: 406,
      percent_change: 11.1
    },
    "Profit Margin": {
      may_2025: 63.5,
      may_2024: 74.2,
      change: -10.7,
      percent_change: -14.4
    },
    "Active SKUs": {
      may_2025: 39,
      may_2024: 32,
      change: 7,
      percent_change: 21.9
    },
    "Average Order Value": {
      may_2025: 32.60,
      may_2024: 32.93,
      change: -0.33,
      percent_change: -1.0
    }
  },

  brand_performance: [
    {
      brand: "Lunovus",
      revenue: 78572.82,
      share: 59.4,
      yoy_growth: 11.3,
      rating: "Strong"
    },
    {
      brand: "MaxiVision", 
      revenue: 32546.35,
      share: 24.6,
      yoy_growth: 10.0,
      rating: "Good"
    },
    {
      brand: "Advanced Theraceuticals",
      revenue: 21194.71,
      share: 16.0,
      yoy_growth: 5.7,
      rating: "Moderate"
    }
  ],

  top_products: [
    {
      rank: 1,
      product: "Premium Eyelid Wipes With Tea Tree",
      brand: "LUN",
      revenue: 53307.47,
      units: 2324,
      margin: 56.3
    },
    {
      rank: 2,
      product: "MaxiVision AREDS 2 Whole Body",
      brand: "MAX",
      revenue: 10476.60,
      units: 228,
      margin: 72.4
    },
    {
      rank: 3,
      product: "Visual Advantage Macular Support",
      brand: "LUN",
      revenue: 7545.45,
      units: 151,
      margin: 92.3
    },
    {
      rank: 4,
      product: "Pro-Optic Traditional Formula",
      brand: "ADV",
      revenue: 5683.76,
      units: 127,
      margin: 71.5
    },
    {
      rank: 5,
      product: "Hydroptic Advanced Dry Eye",
      brand: "ADV",
      revenue: 4853.84,
      units: 216,
      margin: 29.1
    }
  ],

  ppc_portfolio: {
    total_spend: 12379.15,
    total_sales: 28919.24,
    total_clicks: 8256,
    cost_per_click: 1.50,
    acos: 42.8,
    roas: 2.34
  },

  brand_ppc: [
    {
      brand: "Lunovus",
      spend: 6588.37,
      sales: 18555.35,
      acos: 35.5,
      tacos: 8.4,
      roas: 2.82,
      performance: "Good"
    },
    {
      brand: "MaxiVision",
      spend: 1255.19,
      sales: 4999.13,
      acos: 25.1,
      tacos: 3.9,
      roas: 3.98,
      performance: "Excellent"
    },
    {
      brand: "Advanced",
      spend: 4535.59,
      sales: 5364.76,
      acos: 84.5,
      tacos: 21.4,
      roas: 1.18,
      performance: "Needs Work"
    }
  ],

  traffic_metrics: {
    total_sessions: {
      may_2025: 10646,
      may_2024: 9213,
      change: 15.6
    },
    total_page_views: {
      may_2025: 14908,
      may_2024: 12000,
      change: 24.2
    },
    pages_per_session: {
      may_2025: 1.40,
      may_2024: 1.30,
      change: 7.7
    },
    conversion_rate: {
      may_2025: 38.1,
      may_2024: 39.7,
      change: -1.6
    }
  },

  brand_traffic: [
    {
      brand: "Lunovus",
      sessions: 5568,
      page_views: 7677,
      pages_per_session: 1.38,
      conversion_rate: 51.1
    },
    {
      brand: "MaxiVision",
      sessions: 3161,
      page_views: 4469,
      pages_per_session: 1.41,
      conversion_rate: 18.9
    },
    {
      brand: "Advanced",
      sessions: 1917,
      page_views: 2762,
      pages_per_session: 1.44,
      conversion_rate: 31.7
    }
  ],

  revenue_breakdown: [
    {
      source: "Organic Sales",
      amount: 103394.64,
      percentage: 78.1,
      yoy_change: 5.4
    },
    {
      source: "PPC Sales",
      amount: 28919.24,
      percentage: 21.9,
      yoy_change: 3437.6
    },
    {
      source: "Total Revenue",
      amount: 132313.88,
      percentage: 100,
      yoy_change: 10.0
    }
  ]
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let brandChart = null;
let trafficChart = null;
let revenueChart = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initTabNavigation();
    initCharts();
    initTableSorting();
    addInteractiveFeatures();
    const exportBtn = document.getElementById('export-pdf-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportFullReportPDF);
    }
});

// Tab navigation
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Reinitialize charts when tabs become visible
            setTimeout(() => {
                if (targetTab === 'brands' && brandChart) {
                    brandChart.resize();
                } else if (targetTab === 'traffic' && trafficChart) {
                    trafficChart.resize();
                } else if (targetTab === 'revenue' && revenueChart) {
                    revenueChart.resize();
                }
            }, 100);
        });
    });
}

// Initialize all charts
function initCharts() {
    initBrandChart();
    initTrafficChart();
    initRevenueChart();
}

// Brand revenue pie chart
function initBrandChart() {
    const ctx = document.getElementById('brandRevenueChart');
    if (!ctx) return;

    const brandData = dashboardData.brand_performance;
    
    brandChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: brandData.map(brand => brand.brand),
            datasets: [{
                data: brandData.map(brand => brand.revenue),
                backgroundColor: chartColors.slice(0, brandData.length),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Traffic metrics chart
function initTrafficChart() {
    const ctx = document.getElementById('trafficChart');
    if (!ctx) return;

    // Only include Sessions and Page Views
    const trafficData = [
        { metric: 'Sessions', current: dashboardData.traffic_metrics.total_sessions.may_2025, previous: dashboardData.traffic_metrics.total_sessions.may_2024 },
        { metric: 'Page Views', current: dashboardData.traffic_metrics.total_page_views.may_2025, previous: dashboardData.traffic_metrics.total_page_views.may_2024 }
    ];
    
    trafficChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: trafficData.map(metric => metric.metric),
            datasets: [
                {
                    label: 'Current Period (May 2025)',
                    data: trafficData.map(metric => metric.current),
                    backgroundColor: chartColors[0],
                    borderColor: chartColors[0],
                    borderWidth: 1
                },
                {
                    label: 'Previous Period (May 2024)',
                    data: trafficData.map(metric => metric.previous),
                    backgroundColor: chartColors[1],
                    borderColor: chartColors[1],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            // Only show change for Sessions and Page Views
                            const metrics = [
                                { change: dashboardData.traffic_metrics.total_sessions.change },
                                { change: dashboardData.traffic_metrics.total_page_views.change }
                            ];
                            const change = metrics[context.dataIndex].change;
                            const changeText = change > 0 ? `+${change}%` : `${change}%`;
                            return `Change: ${changeText}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Metrics'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Revenue breakdown chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    // Only use Organic and PPC sales for the chart
    const revenueData = dashboardData.revenue_breakdown.slice(0, 2);
    
    revenueChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: revenueData.map(item => item.source),
            datasets: [{
                data: revenueData.map(item => item.amount),
                backgroundColor: [chartColors[0], chartColors[1]],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const item = revenueData[context.dataIndex];
                            return [
                                `${context.label}: $${value.toLocaleString()}`,
                                `${item.percentage}% of total`,
                                `YoY Change: +${item.yoy_change}%`
                            ];
                        }
                    }
                }
            }
        }
    });
}

// Table sorting functionality
function initTableSorting() {
    const sortableTables = document.querySelectorAll('.sortable-table');
    
    sortableTables.forEach(table => {
        const headers = table.querySelectorAll('th[data-sort]');
        
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const sortKey = header.getAttribute('data-sort');
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                // Determine sort direction
                const currentSort = header.classList.contains('sort-asc') ? 'asc' : 
                                  header.classList.contains('sort-desc') ? 'desc' : 'none';
                const newSort = currentSort === 'asc' ? 'desc' : 'asc';
                
                // Clear all sort classes
                headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
                
                // Add new sort class
                header.classList.add(`sort-${newSort}`);
                
                // Sort rows
                rows.sort((a, b) => {
                    const aValue = getSortValue(a, sortKey);
                    const bValue = getSortValue(b, sortKey);
                    
                    if (newSort === 'asc') {
                        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
                    } else {
                        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
                    }
                });
                
                // Re-append sorted rows
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    });
}

function getSortValue(row, sortKey) {
    const cellIndex = {
        'rank': 0,
        'name': 1,
        'brand': 2,
        'revenue': 3,
        'units': 4,
        'margin': 5
    };
    
    const cell = row.cells[cellIndex[sortKey]];
    const text = cell.textContent.trim();
    
    // Handle different data types
    if (sortKey === 'revenue') {
        return parseFloat(text.replace(/[$,]/g, ''));
    } else if (sortKey === 'units' || sortKey === 'rank') {
        return parseInt(text.replace(/,/g, ''));
    } else if (sortKey === 'margin') {
        return parseFloat(text.replace('%', ''));
    } else {
        return text.toLowerCase();
    }
}

// Add interactive features
function addInteractiveFeatures() {
    // Add hover effects to KPI cards
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to table rows
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove selection from other rows in same table
            const table = this.closest('table');
            const allRows = table.querySelectorAll('tbody tr');
            allRows.forEach(r => r.classList.remove('selected'));
            // Add selection to clicked row
            this.classList.add('selected');
        });
    });

    // Add keyboard navigation for tabs
    const tabButtons = document.querySelectorAll('.nav-tab');
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && index > 0) {
                tabButtons[index - 1].focus();
                tabButtons[index - 1].click();
            } else if (e.key === 'ArrowRight' && index < tabButtons.length - 1) {
                tabButtons[index + 1].focus();
                tabButtons[index + 1].click();
            }
        });
    });
}

// Utility functions for number formatting
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

function formatPercentage(value) {
    return `${value}%`;
}

// Responsive chart handling
window.addEventListener('resize', function() {
    setTimeout(() => {
        if (brandChart) brandChart.resize();
        if (trafficChart) trafficChart.resize();
        if (revenueChart) revenueChart.resize();
    }, 100);
});

// Add CSS for selected table row
const style = document.createElement('style');
style.textContent = `
    .data-table tbody tr.selected {
        background-color: var(--color-primary) !important;
        color: var(--color-btn-primary-text) !important;
    }
    
    .data-table tbody tr.selected .status {
        color: var(--color-btn-primary-text) !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        border-color: rgba(255, 255, 255, 0.3) !important;
    }
    
    .data-table tbody tr.selected .positive,
    .data-table tbody tr.selected .negative {
        color: var(--color-btn-primary-text) !important;
    }
`;
document.head.appendChild(style);

// Loading states for charts
function showChartLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="loading" style="display: flex; justify-content: center; align-items: center; height: 200px;">Loading chart...</div>';
    }
}

// Error handling for charts
function handleChartError(error, chartName) {
    console.error(`Error initializing ${chartName}:`, error);
    // Could add user-friendly error messages here
}

// Analytics tracking (placeholder for future implementation)
function trackUserInteraction(action, element) {
    // This could be connected to analytics services
    console.log(`User interaction: ${action} on ${element}`);
}

// Export data functionality (for future enhancement)
function exportData(format = 'json') {
    if (format === 'json') {
        const dataStr = JSON.stringify(dashboardData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'amazon-report-data.json';
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Print functionality
function printReport() {
    window.print();
}

// Export all tabs as a multi-page PDF
function exportFullReportPDF() {
    const tabIds = [
        'overview',
        'brands',
        'products',
        'ppc',
        'traffic',
        'revenue'
    ];
    const originalActive = document.querySelector('.tab-content.active');
    const originalTab = document.querySelector('.nav-tab.active');
    const pdfPages = [];
    let promise = Promise.resolve();

    tabIds.forEach((tabId, idx) => {
        promise = promise.then(() => {
            // Show this tab, hide others
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            document.querySelectorAll('.nav-tab').forEach(nt => nt.classList.remove('active'));
            document.querySelector(`.nav-tab[data-tab="${tabId}"]`).classList.add('active');
            // Wait for charts to render
            return new Promise(resolve => setTimeout(resolve, 500));
        }).then(() => {
            // Clone the tab content for PDF
            const tabContent = document.getElementById(tabId).cloneNode(true);
            // Remove hidden class if any
            tabContent.classList.add('active');
            // Wrap in a container for consistent page size
            const wrapper = document.createElement('div');
            wrapper.style.minHeight = '1000px';
            wrapper.style.padding = '32px';
            wrapper.appendChild(tabContent);
            pdfPages.push(wrapper);
        });
    });

    promise.then(() => {
        // Restore original tab
        if (originalActive) originalActive.classList.add('active');
        if (originalTab) originalTab.classList.add('active');
        // Generate PDF
        const opt = {
            margin:       0,
            filename:     'Amazon-Monthly-Report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };
        // Chain html2pdf for each page
        let worker = html2pdf().set(opt).from(pdfPages[0]);
        for (let i = 1; i < pdfPages.length; i++) {
            worker = worker.toContainer().get('pdf').then(pdf => {
                return html2pdf().set(opt).from(pdfPages[i]).toPdf().get('pdf').then(nextPdf => {
                    const totalPages = nextPdf.internal.getNumberOfPages();
                    for (let j = 1; j <= totalPages; j++) {
                        pdf.addPage();
                        pdf.setPage(pdf.internal.getNumberOfPages());
                        pdf.addImage(nextPdf.getPage(j).data, 'JPEG', 0, 0);
                    }
                    return pdf;
                });
            });
        }
        worker.save();
    });
}