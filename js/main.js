/**
 * AXIOUS LABS — JAVASCRIPT ENGINE
 * Handles interactive code tabs, engineering loop inspector,
 * CareerAI demo simulations, mobile menu, and form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCodeTerminal();
  initEngineeringLoop();
  initCareerAIDemo();
  initContactForm();
  initCopyButtons();
});

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.mobile-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   INTERACTIVE CODE TERMINAL TABS
   ========================================================================== */
const CODE_SNIPPETS = {
  rag: {
    title: 'RAG_VEC_SIMILARITY_ENGINE / V0.2',
    badge: 'LATENCY : 39.4MS [L19]',
    metricVal: '92.8%',
    metricLabel: 'Distributed vector-slice evaluation',
    lines: [
      { num: '01', html: '<span class="c-kw">async def</span> <span class="c-fn">run_hybrid_rag</span>(query: <span class="c-type">Embedding</span>) -&gt; <span class="c-type">QueryExecution</span>:' },
      { num: '02', html: '    <span class="c-comment"># Dynamic semantic temperature across vector branches</span>' },
      { num: '03', html: '    select = <span class="c-kw">await</span> pg_pgvector.<span class="c-fn">top_k</span>(query.prompt, <span class="c-param">top_k</span>=24, <span class="c-param">ef_search</span>=128)' },
      { num: '04', html: '    rerank_nodes = vector_fusion.<span class="c-fn">cross_merge</span>(select, <span class="c-param">lambda_coef</span>=0.78, <span class="c-param">alpha</span>=3)' },
      { num: '05', html: '    exec_runtime = langgraph_pipeline.<span class="c-fn">with_context</span>(rerank_nodes, <span class="c-param">token_budget</span>=TokenBudget(2048))' },
      { num: '06', html: '    <span class="c-kw">return await</span> state_machine.<span class="c-fn">eval_until_resolution</span>(exec_runtime)' }
    ]
  },
  agent: {
    title: 'LANGGRAPH_AGENT_ORCHESTRATOR / V1.4',
    badge: 'STATE : CONVERGED [L42]',
    metricVal: '99.4%',
    metricLabel: 'Deterministic ReAct cycle pass rate',
    lines: [
      { num: '01', html: '<span class="c-kw">class</span> <span class="c-type">CareerAgentState</span>(TypedDict):' },
      { num: '02', html: '    messages: Sequence[BaseMessage]' },
      { num: '03', html: '    candidate_vector: ndarray' },
      { num: '04', html: '    skill_deltas: List[SkillGap]' },
      { num: '05', html: '' },
      { num: '06', html: 'workflow = StateGraph(CareerAgentState)' },
      { num: '07', html: 'workflow.<span class="c-fn">add_node</span>(<span class="c-str">"eval_skills"</span>, run_semantic_gap_analysis)' },
      { num: '08', html: 'workflow.<span class="c-fn">add_conditional_edges</span>(<span class="c-str">"eval_skills"</span>, should_route_to_mock_interview)' },
      { num: '09', html: 'agent_runtime = workflow.<span class="c-fn">compile</span>(<span class="c-param">checkpointer</span>=MemorySaver())' }
    ]
  },
  mcp: {
    title: 'MCP_TOOL_DISPATCHER / V0.8',
    badge: 'PROTOCOL : MCP/1.0',
    metricVal: '14.2MS',
    metricLabel: 'Local Model Context Protocol RPC roundtrip',
    lines: [
      { num: '01', html: '<span class="c-kw">@mcp.tool</span>()' },
      { num: '02', html: '<span class="c-kw">async def</span> <span class="c-fn">synthesize_learning_roadmap</span>(' },
      { num: '03', html: '    target_role: <span class="c-type">str</span>,' },
      { num: '04', html: '    missing_competencies: <span class="c-type">list[str]</span>' },
      { num: '05', html: ') -&gt; <span class="c-type">RoadmapManifest</span>:' },
      { num: '06', html: '    <span class="c-comment"># Query FAISS vector index for curriculum chunks</span>' },
      { num: '07', html: '    chunks = <span class="c-kw">await</span> curriculum_store.<span class="c-fn">fetch_prerequisites</span>(missing_competencies)' },
      { num: '08', html: '    <span class="c-kw">return</span> RoadmapManifest.<span class="c-fn">build_directed_dag</span>(chunks, <span class="c-param">target_role</span>=target_role)' }
    ]
  }
};

function initCodeTerminal() {
  const tabs = document.querySelectorAll('.term-tab');
  const codeBody = document.querySelector('.terminal-body');
  const titleEl = document.querySelector('.terminal-title');
  const badgeEl = document.querySelector('.terminal-badge');
  const metricValEl = document.querySelector('.term-metric-val');
  const metricLblEl = document.querySelector('.term-metric-lbl');

  if (!tabs.length || !codeBody) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const snippetKey = tab.getAttribute('data-tab');
      const snippet = CODE_SNIPPETS[snippetKey];
      if (!snippet) return;

      if (titleEl) titleEl.textContent = snippet.title;
      if (badgeEl) badgeEl.textContent = snippet.badge;
      if (metricValEl) metricValEl.textContent = snippet.metricVal;
      if (metricLblEl) metricLblEl.textContent = snippet.metricLabel;

      codeBody.innerHTML = snippet.lines
        .map(line => `
          <div class="code-line">
            <span class="line-num">${line.num}</span>
            <span class="code-content">${line.html}</span>
          </div>
        `)
        .join('');
    });
  });
}

/* ==========================================================================
   ENGINEERING LOOP (6 STAGES)
   ========================================================================== */
const LIFECYCLE_STAGES = [
  {
    num: 'STAGE 01',
    name: 'Clear & Concrete Problem Formulation',
    desc: 'We reject vanity concepts. Any project pitch must articulate a precise failure mode in existing software, why classical logic fails short, and how neural components introduce measurable utility.',
    review: '5 page RFC containing API contracts, token consumption estimates, and measurable acceptance tests.',
    gate: 'Peer approval from at least two lab contributors before code commit begins.',
    file: 'RFC_001_HYBRID_RAG.md',
    status: 'ACCEPTED',
    reviewers: '2 Core Peers',
    sla: '< 72 Hours'
  },
  {
    num: 'STAGE 02',
    name: 'Architecture & System Specification',
    desc: 'Deterministic system modeling before implementation. We define state graphs, memory persistence layers, data boundaries, and OpenAPI contracts to prevent post-hoc architectural drift.',
    review: 'Complete JSON Schema definitions, LangGraph state machine DAG, and token budget allocations.',
    gate: 'Zero circular state transitions and schema validation verified by automated test harness.',
    file: 'SPEC_002_STATE_GRAPH.json',
    status: 'APPROVED',
    reviewers: 'Project Lead + Backend Eng',
    sla: '< 48 Hours'
  },
  {
    num: 'STAGE 03',
    name: 'FastPOC Prototype & Kernel Spike',
    desc: 'Turn architectural diagrams into running kernels. We build isolated functional spikes to validate end-to-end vector queries, API latencies, and neural inference before touching UI.',
    review: 'Working Python/TypeScript kernel with reproducible local container environment.',
    gate: 'Latency under 500ms p95 and semantic retrieval accuracy exceeding 88%.',
    file: 'SPIKE_003_KERNEL.py',
    status: 'VALIDATED',
    reviewers: 'GenAI + Agentic Eng',
    sla: '< 96 Hours'
  },
  {
    num: 'STAGE 04',
    name: 'Evaluation & Adversarial Benchmarking',
    desc: 'Every neural pipeline is stress-tested. We construct synthetic adversarial prompt suites, measure token drift, evaluate cross-encoder rerank recall, and prevent hallucination loops.',
    review: 'Automated evaluation matrix running 200+ edge-case student resumes against job descriptions.',
    gate: '> 92% pass rate across deterministic golden test sets.',
    file: 'EVAL_004_HARNESS.py',
    status: 'PASSING',
    reviewers: 'Data Analyst + GenAI Eng',
    sla: '< 24 Hours'
  },
  {
    num: 'STAGE 05',
    name: 'Telemetry Deployment & Monorepo Merge',
    desc: 'Hermetic containerization with zero runtime magic. Deployed via Docker with OpenTelemetry instrumentation, structured JSON error boundaries, and GitHub Actions CI pipelines.',
    review: 'Production-ready container image, health checks, and vector index persistence verify.',
    gate: 'Clean automated CI build, zero critical vulnerabilities in dependencies, and signed commit.',
    file: 'DEPLOY_005_DOCKER.yaml',
    status: 'DEPLOYED',
    reviewers: 'Lead + Backend Eng',
    sla: '< 12 Hours'
  },
  {
    num: 'STAGE 06',
    name: 'Iteration & Continuous Refinement',
    desc: 'Production is an observation loop. We monitor real query latencies, token spend efficiency, and user feedback vectors to drive iterative model fine-tuning and architectural upgrades.',
    review: 'Weekly latency metrics breakdown, token budget audit, and retrospective documentation.',
    gate: 'Documented retrospective logged and next iteration backlog prioritized.',
    file: 'LOOP_006_RETRO.md',
    status: 'ACTIVE LOOP',
    reviewers: 'Entire Lab',
    sla: 'Continuous'
  }
];

function initEngineeringLoop() {
  const buttons = document.querySelectorAll('.lifecycle-btn');
  const numEl = document.querySelector('.life-stage-num');
  const nameEl = document.querySelector('.life-stage-name');
  const descEl = document.querySelector('.life-stage-desc');
  const reviewEl = document.querySelector('.life-stage-review');
  const gateEl = document.querySelector('.life-stage-gate');
  const fileEl = document.querySelector('.life-stage-file');
  const statusEl = document.querySelector('.life-stage-status');
  const reviewersEl = document.querySelector('.life-stage-reviewers');
  const slaEl = document.querySelector('.life-stage-sla');

  if (!buttons.length || !numEl) return;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const data = LIFECYCLE_STAGES[index];
      if (!data) return;

      numEl.textContent = data.num;
      nameEl.textContent = data.name;
      descEl.textContent = data.desc;
      reviewEl.textContent = data.review;
      gateEl.textContent = data.gate;
      fileEl.textContent = data.file;
      statusEl.textContent = data.status;
      reviewersEl.textContent = data.reviewers;
      slaEl.textContent = data.sla;
    });
  });
}

/* ==========================================================================
   CAREERAI INTERACTIVE PREVIEW SIMULATION
   ========================================================================== */
const CAREERAI_VIEWS = {
  resume: `
    <div class="cai-panel-header">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        Resume Intelligence Analysis
      </h3>
      <span class="badge badge-emerald">ATS MATCH: 94%</span>
    </div>
    <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 16px;">
      Deep semantic extraction across 42 technical parameters. Vector embeddings match target job ontology.
    </p>
    <div style="margin-bottom: 20px;">
      <h5 style="font-size: 12px; font-family: var(--font-mono); color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Extracted & Verified Competencies:</h5>
      <div class="skill-pill-list">
        <span class="skill-pill match">✓ Python & FastAPI</span>
        <span class="skill-pill match">✓ LangGraph & Agents</span>
        <span class="skill-pill match">✓ Vector Search (FAISS/pgvector)</span>
        <span class="skill-pill match">✓ Docker & CI/CD</span>
        <span class="skill-pill match">✓ REST & WebSocket APIs</span>
      </div>
    </div>
    <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); padding: 12px 16px; border-radius: 6px; font-size: 12.5px; color: #FDE68A;">
      <strong>Optimization Insight:</strong> Quantify throughput gains in your RAG pipeline project (e.g. "+35% latency drop via caching") to boost hiring manager score.
    </div>
  `,
  skills: `
    <div class="cai-panel-header">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818CF8" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
        Skill Gap Analysis (Target: AI Systems Engineer)
      </h3>
      <span class="badge badge-cyan">SIMILARITY: 0.88</span>
    </div>
    <p style="font-size: 13.5px; color: var(--text-secondary); margin-bottom: 16px;">
      High semantic alignment with machine learning systems, minor delta in distributed model evaluation.
    </p>
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
      <div>
        <div style="display:flex; justify-content:space-between; font-size:12px; font-family:var(--font-mono); margin-bottom:4px;">
          <span>Core Python / Async</span>
          <span style="color:var(--accent-emerald);">98% Match</span>
        </div>
        <div style="height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
          <div style="width:98%; height:100%; background:var(--accent-emerald);"></div>
        </div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:12px; font-family:var(--font-mono); margin-bottom:4px;">
          <span>LangGraph & Agentic Workflow</span>
          <span style="color:var(--accent-cyan);">94% Match</span>
        </div>
        <div style="height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
          <div style="width:94%; height:100%; background:var(--accent-cyan);"></div>
        </div>
      </div>
      <div>
        <div style="display:flex; justify-content:space-between; font-size:12px; font-family:var(--font-mono); margin-bottom:4px;">
          <span>Distributed Eval & Benchmarking</span>
          <span style="color:var(--accent-amber);">72% Match (Skill Delta)</span>
        </div>
        <div style="height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
          <div style="width:72%; height:100%; background:var(--accent-amber);"></div>
        </div>
      </div>
    </div>
  `,
  jobs: `
    <div class="cai-panel-header">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Semantic Job Matching Matrix
      </h3>
      <span class="badge badge-emerald">3 DIRECT MATCHES</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:12px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="font-size:14px; color:#FFFFFF;">AI Platform Engineer (Early Stage)</h4>
          <span style="font-size:12px; color:var(--text-muted);">San Francisco, CA / Remote • Series A</span>
        </div>
        <div style="text-align:right;">
          <span style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:var(--accent-emerald);">96% Vector Match</span>
        </div>
      </div>
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:12px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="font-size:14px; color:#FFFFFF;">Agentic Workflows Developer</h4>
          <span style="font-size:12px; color:var(--text-muted);">New York, NY / Hybrid • AI Tech Venture</span>
        </div>
        <div style="text-align:right;">
          <span style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:var(--accent-cyan);">91% Vector Match</span>
        </div>
      </div>
    </div>
  `,
  roadmap: `
    <div class="cai-panel-header">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A855F7" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Personalized AI Learning Roadmap
      </h3>
      <span class="badge badge-cyan">ESTIMATED: 3 WEEKS</span>
    </div>
    <div class="roadmap-flow">
      <div class="roadmap-step">
        <div class="step-circle">01</div>
        <div class="step-details">
          <h5>Construct Vector Evaluation Benchmark</h5>
          <p>Implement synthetic regression test harness using DeepEval / Promptfoo on 50 edge cases.</p>
        </div>
      </div>
      <div class="roadmap-step">
        <div class="step-circle">02</div>
        <div class="step-details">
          <h5>Integrate Model Context Protocol (MCP)</h5>
          <p>Expose local PostgreSQL schema tools as standard MCP endpoints for agent orchestration.</p>
        </div>
      </div>
      <div class="roadmap-step">
        <div class="step-circle">03</div>
        <div class="step-details">
          <h5>Deploy Flutter Mobile Client with Real-time Stream</h5>
          <p>Wire WebSocket streaming responses into stateful UI components with offline caching.</p>
        </div>
      </div>
    </div>
  `,
  interview: `
    <div class="cai-panel-header">
      <h3>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        AI Mock Interview & Technical Probe
      </h3>
      <span class="badge badge-emerald">ACTIVE SESSION</span>
    </div>
    <div style="background:#080A10; border:1px solid var(--border-subtle); border-radius:6px; padding:14px; margin-bottom:12px;">
      <div style="font-family:var(--font-mono); font-size:11px; color:var(--accent-cyan); margin-bottom:4px;">INTERVIEWER AGENT // SYSTEM PROBE:</div>
      <p style="font-size:13px; color:#E2E8F0;">
        "Suppose your vector retrieval index experiences high latency under concurrent spikes. How would you design a multi-tiered cache with cross-encoder rerank fallback?"
      </p>
    </div>
    <div style="background:rgba(99, 102, 241, 0.08); border:1px solid rgba(129, 140, 248, 0.2); border-radius:6px; padding:14px;">
      <div style="font-family:var(--font-mono); font-size:11px; color:var(--accent-indigo); margin-bottom:4px;">EVALUATION RUBRIC:</div>
      <p style="font-size:12.5px; color:var(--text-secondary);">
        Assessing semantic architecture clarity, memory trade-offs, and fault-tolerance knowledge.
      </p>
    </div>
  `
};

function initCareerAIDemo() {
  const tabBtns = document.querySelectorAll('.preview-tab-btn');
  const panelContainer = document.querySelector('.cai-panel-target');

  if (!tabBtns.length || !panelContainer) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const viewKey = btn.getAttribute('data-view');
      const viewHtml = CAREERAI_VIEWS[viewKey];
      if (viewHtml) {
        panelContainer.innerHTML = viewHtml;
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM & TOAST ALERTS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('axiousContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all fields before sending.', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Transmitting...</span>';

    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span>';
      showToast('Thank you! Your message has been logged. We will respond promptly.', 'success');
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 3000);
    }, 800);
  });
}

/* ==========================================================================
   COPY TO CLIPBOARD HELPER
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
      }).catch(() => {
        showToast('Unable to copy to clipboard', 'warning');
      });
    });
  });
}

function showToast(message, type = 'success') {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'success'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
