// Desert Falcons Collective — Join Form Handler
// Supabase integration

const SUPABASE_URL = 'https://ehcvjxggkfsdhzraucbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY3ZqeGdna2ZzZGh6cmF1Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MjA0MTgsImV4cCI6MjA4ODE5NjQxOH0.VvjiIrgVOONN_UOmwB0Q6hL_0aOjLlmfdVibKd627O8';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Show/hide role-specific fields based on selected interest
function updateFieldVisibility(interest) {
    const fieldSpec    = document.getElementById('fieldSpecialization');
    const fieldDesign  = document.getElementById('fieldDesignDiscipline');
    const investorFields = document.getElementById('investorFields');

    if (fieldSpec)       fieldSpec.style.display       = (interest === 'engineer') ? '' : 'none';
    if (fieldDesign)     fieldDesign.style.display     = (interest === 'designer') ? '' : 'none';
    if (investorFields)  investorFields.style.display  = (interest === 'investor') ? '' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Wire field show/hide to interest select
    const interestSelectEl = document.getElementById('interest');
    if (interestSelectEl) {
        interestSelectEl.addEventListener('change', function () {
            updateFieldVisibility(this.value);
        });
        // Set initial state on load
        updateFieldVisibility(interestSelectEl.value);
    }

    // Pre-select role from URL param: join.html?role=investor
    (function () {
        const params = new URLSearchParams(window.location.search);
        const role = params.get('role');
        if (!role) return;
        const interestSel = document.getElementById('interest');
        if (interestSel) {
            const match = Array.from(interestSel.options).find(o => o.value === role);
            if (match) {
                interestSel.value = role;
                interestSel.dispatchEvent(new Event('change'));
            }
        }
        // Also activate the matching role pill
        const pill = document.querySelector(`.role-pill[data-role="${role}"]`);
        if (pill) {
            document.querySelectorAll('.role-pill').forEach(p => p.classList.remove('role-pill--active'));
            pill.classList.add('role-pill--active');
        }
    })();

    const form = document.getElementById('joinForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('.join-submit-btn');
        const btnText = btn.querySelector('span');

        // Basic validation
        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach(el => {
            el.classList.remove('input-error');
            if (!el.value.trim()) {
                el.classList.add('input-error');
                valid = false;
            }
        });

        if (!valid) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Build payload
        const payload = {
            full_name:         getValue('fullName'),
            email:             getValue('email'),
            phone:             getValue('phone'),
            interest:          getValue('interest'),
            specialization:    getValue('specialization'),
            experience:        getValue('experience'),
            design_discipline: getValue('designDiscipline'),
            portfolio_url:     getValue('portfolio'),
            investment_range:  getValue('investmentRange'),
            investor_type:     getValue('investorType'),
            hear_about:        getValue('hearAbout'),
            terms_agreed:      document.getElementById('termsAgree').checked
        };

        // Loading state
        btn.disabled = true;
        btnText.textContent = 'Submitting...';

        const { error } = await supabase
            .from('collective_applications')
            .insert([payload]);

        if (error) {
            console.error('Supabase error:', error);
            showFormMessage('Something went wrong. Please try again.', 'error');
            btn.disabled = false;
            btnText.textContent = 'Join the Collective';
        } else {
            showSuccessState();
        }
    });
});

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() || null : null;
}

function showFormMessage(msg, type) {
    let el = document.getElementById('formMessage');
    if (!el) {
        el = document.createElement('div');
        el.id = 'formMessage';
        const btn = document.querySelector('.join-submit-btn');
        btn.parentNode.insertBefore(el, btn);
    }
    el.className = 'form-message form-message--' + type;
    el.textContent = msg;
}

function showSuccessState() {
    const formWrap = document.querySelector('.join-form-wrap');
    formWrap.innerHTML = `
        <div class="join-success">
            <div class="join-success-icon">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="24" cy="24" r="20"/>
                    <path d="M14 24l8 8 12-14"/>
                </svg>
            </div>
            <h2 class="join-success-title">You're in the Collective.</h2>
            <p class="join-success-body">Thank you for registering your interest. We've received your application and will be in touch when the time is right.</p>
            <p class="join-success-sub">— Desert Falcons Collective</p>
        </div>
    `;
}
