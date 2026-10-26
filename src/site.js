import './site.css'

// Marks the nav link for the current page.
const page = document.body.dataset.page
document.querySelectorAll('.nav__links a').forEach((a) => {
  if (a.dataset.nav === page) a.setAttribute('aria-current', 'page')
})

// Copy buttons: <button data-copy="text">.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy)
      btn.textContent = 'Copied'
    } catch {
      btn.textContent = 'Select and copy'
    }
    setTimeout(() => (btn.textContent = 'Copy'), 1600)
  })
})

// Plays the example session line by line the first time it scrolls into view.
const script = document.getElementById('script')
if (script) {
  const replay = document.getElementById('replay')
  const lines = [...script.children]
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!still && 'IntersectionObserver' in window) {
    let timers = []
    const play = () => {
      timers.forEach(clearTimeout)
      timers = []
      script.classList.add('is-playing')
      lines.forEach((li) => li.classList.remove('is-shown'))
      let t = 0
      lines.forEach((li) => {
        t += li.classList.contains('gap') ? 250 : li.querySelector('.dialog') ? 900 : 520
        timers.push(setTimeout(() => li.classList.add('is-shown'), t))
      })
      timers.push(setTimeout(() => (replay.hidden = false), t + 200))
    }
    script.classList.add('is-playing')
    const seen = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen.disconnect()
          play()
        }
      },
      { threshold: 0.35 },
    )
    seen.observe(script)
    replay.addEventListener('click', play)
  }
}
