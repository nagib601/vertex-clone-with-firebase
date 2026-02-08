import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './routes/Routes';
import AuthProvider from './context/AuthProvider';

// [1] TanStack Query ইমপোর্ট
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// [2] ক্লায়েন্ট তৈরি
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* [3] QueryClientProvider দিয়ে অ্যাপ র‍্যাপ করা হলো */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
