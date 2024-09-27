import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  project_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload; // Lưu danh sách project từ API vào state
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
