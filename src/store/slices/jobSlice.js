import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
import { API_ENDPOINTS } from '../../config/api';

const initialState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  pagination: {
    current_page: 1,
    total: 0,
    per_page: 10,
  },
};

// Async thunks
export const fetchJobs = createAsyncThunk(
  'job/fetchJobs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.LIST, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch jobs' });
    }
  }
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.CREATE, jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create job' });
    }
  }
);

export const fetchJobById = createAsyncThunk(
  'job/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.JOBS.SHOW(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch job' });
    }
  }
);

export const markInterested = createAsyncThunk(
  'job/markInterested',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.INTERESTED(jobId));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to mark interested' });
    }
  }
);

export const shortlistProfessional = createAsyncThunk(
  'job/shortlistProfessional',
  async ({ jobId, professionalId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.JOBS.SHORTLIST(jobId), {
        professional_id: professionalId,
      });
      return { ...response.data, jobId, professionalId };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update shortlist' });
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Jobs
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || {};
        state.jobs = payload.jobs || [];
        state.pagination = payload.pagination || state.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch jobs';
      });

    // Create Job
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        const job = action.payload?.data?.job;
        if (job) state.jobs.unshift(job);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create job';
      });

    // Fetch Job By ID
    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload?.data?.job || null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch job';
      });

    // Mark Interested
    builder
      .addCase(markInterested.fulfilled, (state) => {
        if (state.currentJob) {
          state.currentJob.user_interested = true;
        }
      })
      .addCase(shortlistProfessional.fulfilled, (state, action) => {
        if (!state.currentJob?.interests) return;
        const { professionalId } = action.meta.arg;
        const status = action.payload?.data?.status;
        const interest = state.currentJob.interests.find(
          (i) => i.professional_id === professionalId
        );
        if (interest && status) {
          interest.status = status;
        }
      });
  },
});

export const { clearJobs, clearError } = jobSlice.actions;
export default jobSlice.reducer;
