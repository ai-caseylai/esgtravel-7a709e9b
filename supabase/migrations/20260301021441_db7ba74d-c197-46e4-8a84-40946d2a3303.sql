-- Assign admin role to Casey Lai
INSERT INTO public.user_roles (user_id, role)
VALUES ('8cdd8987-3c8a-47e6-b219-ed8d07a8afaf', 'admin')
ON CONFLICT DO NOTHING;

-- Auto-assign admin to first user if no admin exists
CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_first_admin_assignment
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_first_admin();