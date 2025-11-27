import '../styles/style.css'

document.querySelector('#app').innerHTML = `
  <main class="page">
    <div class="wrapper">
      <div class="steps">
        <div class="step active" id="step1">
          <p class="step-title">Are you actually Ayesha Abba?</p>
          <p class="step-subtitle">Please answer honestly. We have ways of knowing.</p>
          <div class="step-actions">
            <button class="btn yes" data-next="step2">Yes</button>
            <button class="btn no">No</button>
            <p class="deny-message">Hmm… interesting. But only the real Ayesha may proceed</p>
          </div>
        </div>

        <div class="step" id="step2">
          <p class="step-title">Is today the 28th of November…</p>
          <p class="step-subtitle">aka YOUR birthday?</p>
          <div class="step-actions">
            <button class="btn yes" data-next="step3">Yes</button>
            <button class="btn no">No</button>
            <p class="deny-message">Oh? Then why are you here on this extremely suspicious day?</p>
          </div>
        </div>

        <div class="step" id="step3">
          <p class="step-title">Is your brother Suleiman Abba?</p>
          <p class="step-subtitle">aka The coolest brother ever</p>
          <div class="step-actions">
            <button class="btn yes" data-next="step4">Yes</button>
            <button class="btn no">No</button>
            <p class="deny-message">Tsek, I'm Awesome.</p>
          </div>
        </div>

        <div class="step" id="step4">
          <p class="step-title">Is your brother the most amazingly awesome human ever?</p>
          <p class="step-subtitle">(Choose wisely.)</p>
          <div class="step-actions">
            <button class="btn yes" data-next="done">Yes</button>
            <button class="btn no">No</button>
            <p class="deny-message">Your honesty is questionable, but we’ll let you reconsider.</p>
          </div>
        </div>
      </div>
      <div class="reveal-image" id="reveal-image">
        <img src="" alt="response preview" />
      </div>
    </div>
  </main>
`

const steps = Array.from(document.querySelectorAll('.step'))
const stepsContainer = document.querySelector('.steps')
const wrapper = document.querySelector('.wrapper')
const revealImage = document.querySelector('#reveal-image img')

const showSideImage = (src) => {
  if (!wrapper || !revealImage) return
  revealImage.src = src
  wrapper.classList.add('reveal')
}

const showStep = (id) => {
  if (id === 'done' || id === 'book.html') {
    window.location.assign('book.html')
    return
  }

  const target = steps.find((step) => step.id === id)
  if (!target) return

  steps.forEach((step) => {
    const isTarget = step === target
    step.classList.toggle('active', isTarget)
    step.classList.remove('fade')
    step.style.display = isTarget ? 'block' : 'none'
  })

  requestAnimationFrame(() => {
    target.classList.add('fade')
  })
}

const showDenyMessage = (step) => {
  const msg = step?.querySelector('.deny-message')
  if (!msg) return
  msg.classList.add('show')
}

// Init visibility
const activeStep = document.querySelector('.step.active') || steps[0]
if (activeStep) showStep(activeStep.id)

// Handle "Yes" buttons
document.querySelectorAll('[data-next]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const nextId = btn.dataset.next
    const currentStep = btn.closest('.step')
    currentStep?.querySelector('.deny-message')?.classList.remove('show')
    if (nextId === 'done') {
      showSideImage('./assets/images/book.jpg')
      setTimeout(() => showStep(nextId), 800)
      return
    }
    showStep(nextId)
  })
})

// Handle "No" buttons
document.querySelectorAll('.btn.no').forEach((btn) => {
  btn.addEventListener('click', () => {
    const step = btn.closest('.step')
    showDenyMessage(step)
    if (step?.id === 'step4') {
      showSideImage('./assets/images/no.jpg')
    }
  })
})
