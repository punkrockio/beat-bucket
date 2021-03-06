// PROJECT ACTIONS

export const PLAY = 'play';
export const STOP = 'stop';
export const CHANGE_PROJECT_NAME = 'change_project_name';
export const UPDATE_TEST_NOTE = 'update_test_note';
export const LOAD_PROJECT = 'load_project';
export const DELETE_PROJECT = 'delete_project';
export const CREATE_NEW_PROJECT = 'create_new_project';
export const CHANGE_BPM = 'change_bpm';
export const SHARE = 'share';
export const UNSHARE = 'unshare';

export const play = () => ({ type: PLAY });
export const stop = () => ({ type: STOP });

export const changeProjectName = ({ name }) => ({
  type: CHANGE_PROJECT_NAME,
  payload: { name }
});

export const updateTestNote = ({ on, value }) => ({
  type: UPDATE_TEST_NOTE,
  payload: { on, value }
});

export const loadProject = ({ data, id }) => ({
  type: LOAD_PROJECT,
  payload: { data, id }
});

export const deleteProject = (id) => ({
  type: DELETE_PROJECT,
  payload: id
});

export const createNewProject = () => ({
  type: CREATE_NEW_PROJECT
});

export const changeBPM = ({ bpm }) => ({
  type: CHANGE_BPM,
  payload: { bpm }
});

export const share = () => ({
  type: SHARE
});

export const unshare = () => ({
  type: UNSHARE
});
