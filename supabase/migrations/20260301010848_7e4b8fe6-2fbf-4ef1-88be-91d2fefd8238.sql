
-- Fix: Drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles FOR DELETE
USING (has_role(auth.uid(), 'admin'));
