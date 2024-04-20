import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface DocumentState {
  content: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  documents: Document[];
  selectedDocument: Document | null;
}

interface UpdateDocumentContentPayload {
  id: string;
  content: string;
}

interface UpdateDocumentNamePayload {
  id: string;
  name: string;
}

interface Document {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}

// Define type for the data stored in localStorage
type StoredDocument = {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}[];

const savedDocuments = localStorage.getItem('documents');
const initialState: DocumentState = {
  content: '',
  status: 'idle',
  error: null,
  documents: savedDocuments ? (JSON.parse(savedDocuments) as StoredDocument) : [],
  selectedDocument: null,
};

export const fetchDocument = createAsyncThunk('document/fetchDocument', async () => {
  const response = await fetch('../../public/data.json');
  const data = await response.json();
  return data.content;
});

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    updateDocumentContent: (state, action: PayloadAction<UpdateDocumentContentPayload>) => {
      const { id, content } = action.payload;
      const documentIndex = state.documents.findIndex(doc => doc.id === id);
      if (documentIndex !== -1) {
        state.documents[documentIndex].content = content;
        // Add type assertion to ensure selectedDocument is treated as Document
        if ((state.selectedDocument as Document)?.id === id) {
          (state.selectedDocument as Document).content = content;
        }
        localStorage.setItem('documents', JSON.stringify(state.documents));
      }
    },
    updateDocumentName: (state, action: PayloadAction<UpdateDocumentNamePayload>) => {
      const { id, name } = action.payload;
      const documentIndex = state.documents.findIndex(doc => doc.id === id);
      if (documentIndex !== -1) {
        state.documents[documentIndex].name = name;
        // Add type assertion to ensure selectedDocument is treated as Document
        if ((state.selectedDocument as Document)?.id === id) {
          (state.selectedDocument as Document).name = name;
        }
        localStorage.setItem('documents', JSON.stringify(state.documents));
      }
    },
    createDocument(state) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: 'Untitled',
        createdAt: new Date().toISOString(),
        content: '',
      };
      state.documents.push(newDocument);
      localStorage.setItem('documents', JSON.stringify(state.documents));
    },
    selectDocument: (state, action: PayloadAction<string>) => {
      state.selectedDocument = state.documents.find(doc => doc.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocument.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDocument.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        // Set the content of the data.json file to the selectedDocument
        state.selectedDocument = {
          id: 'dataJson', // You can use a unique identifier here
          name: 'Welcome',
          createdAt: new Date().toISOString(),
          content: action.payload, // Set the content here
        };
      })
      .addCase(fetchDocument.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { updateDocumentContent, updateDocumentName, createDocument, selectDocument } = documentSlice.actions;
export default documentSlice.reducer;
