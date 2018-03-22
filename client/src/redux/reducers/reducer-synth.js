// SEQUENCE REDUCER

import {
  UPDATE_ATTACK,
  UPDATE_DECAY,
  UPDATE_SUSTAIN,
  UPDATE_RELEASE
} from '../actions/actions-synth';

export default function SynthReducer(state, action) {
  let newState;
  const { payload, type } = action;
  switch (type) {

  case UPDATE_ATTACK:
    newState = { ...state };
    newState.envelope = { ...newState.envelope };
    newState.envelope.attack = payload.value;
    return newState;

  case UPDATE_DECAY:
    newState = { ...state };
    newState.envelope = { ...newState.envelope };
    newState.envelope.decay = payload.value;
    return newState;

  case UPDATE_SUSTAIN:
    newState = { ...state };
    newState.envelope = { ...newState.envelope };
    newState.envelope.sustain = payload.value;
    return newState;

  case UPDATE_RELEASE:
    newState = { ...state };
    newState.envelope = { ...newState.envelope };
    newState.envelope.release = payload.value;
    return newState;

  default:
    return state;
  }
}
