-- Create table for recruitment applications
CREATE TABLE public.recruitment_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  branch TEXT NOT NULL,
  department TEXT NOT NULL,
  domain TEXT NOT NULL CHECK (domain IN ('Technical', 'Management')),
  subdomain TEXT NOT NULL,
  domain_answers JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but allow public access for recruitment)
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert applications
CREATE POLICY "Anyone can submit recruitment applications" 
ON public.recruitment_applications 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading applications (for admin purposes)
CREATE POLICY "Applications are publicly readable" 
ON public.recruitment_applications 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_recruitment_applications_updated_at
BEFORE UPDATE ON public.recruitment_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();