console.log('%c♥ State Machines ♥', 'color: #f2a3b3')

// (A, S, S0, T, F) where:
// A - is the input alphabet (finite, non empty)
// S - is a set of states (finite, non empty)
// S0 - initial state (element of S)
// T - transition map S x A -> S
// F - set of final states (possibly empty)

// This is just a quick example that can be fleshed out more based on need!
class StateMachine {
  constructor (A, S, S0, T, F) {
    this.A = A
    this.S = S
    this.S0 = S0
    this.T = T
    this.F = F
  }

  get initialState () {
    return this.S0
  }

  transition (state, input) {
    return this.T[state][input] || state
  }
}

// INPUT ALPHABET
const A = {
  FETCH: Symbol('FETCH'),
  RESOLVE: Symbol('RESOLVE'),
  REJECT: Symbol('REJECT')
}
// SET OF FINITE STATES
const S = {
  idle: Symbol('idle'),
  fetching: Symbol('fetching'),
  success: Symbol('success'),
  error: Symbol('error')
}
// INITIAL STATE
const S0 = S.idle
// TRANSITION MAP
const T = {
  // S
  [S.idle]: {
    // A -> S
    [A.FETCH]: S.fetching
  },
  [S.fetching]: {
    [A.RESOLVE]: S.success,
    [A.REJECT]: S.error
  },
  [S.success]: {
    [A.FETCH]: S.fetching
  },
  [S.error]: {
    [A.FETCH]: S.fetching
  }
}
// FINAL STATES
const F = {}

const stateMachine = new StateMachine(A, S, S0, T, F)
let state = stateMachine.initialState

const main = () => {
  console.log(`initial state: `, state)
  const actionsToRun = [A.FETCH, A.RESOLVE, A.FETCH, A.FETCH, A.REJECT, A.FETCH, Symbol('UNHANDLED'), A.RESOLVE]
  actionsToRun.forEach(action => {
    console.group('Transition: ')
    console.log('from ', state)
    state = stateMachine.transition(state, action)
    console.log('action ', action)
    console.log('to ', state)
    console.groupEnd()
  })
}

main()
