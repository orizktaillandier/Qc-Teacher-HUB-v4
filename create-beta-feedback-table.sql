-- Create beta_feedback table
CREATE TABLE IF NOT EXISTS public.beta_feedback (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    feedback TEXT NOT NULL,
    user_agent TEXT,
    current_page TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT beta_feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS beta_feedback_user_id_idx ON public.beta_feedback(user_id);
CREATE INDEX IF NOT EXISTS beta_feedback_created_at_idx ON public.beta_feedback(created_at);
