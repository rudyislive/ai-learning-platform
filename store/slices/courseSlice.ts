import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course, Lesson } from '@/types/course.types';
import { courseService } from '@/services/course.service';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  currentLesson: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await courseService.getAllCourses();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await courseService.getCourseById(courseId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course');
    }
  }
);

export const fetchLessonById = createAsyncThunk(
  'courses/fetchLesson',
  async (lessonId: string, { rejectWithValue }) => {
    try {
      return await courseService.getLessonById(lessonId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lesson');
    }
  }
);

export const markLessonComplete = createAsyncThunk(
  'courses/markComplete',
  async (lessonId: string, { rejectWithValue }) => {
    try {
      await courseService.markLessonComplete(lessonId);
      return lessonId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark lesson complete');
    }
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearCurrentLesson: (state) => {
      state.currentLesson = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch lesson
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLesson = action.payload;
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Mark lesson complete
      .addCase(markLessonComplete.fulfilled, (state, action) => {
        if (state.currentLesson?.id === action.payload) {
          state.currentLesson.isCompleted = true;
        }
      });
  },
});

export const { clearCurrentCourse, clearCurrentLesson } = courseSlice.actions;
export default courseSlice.reducer;
