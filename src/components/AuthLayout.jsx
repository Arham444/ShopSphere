import PropTypes from "prop-types";

function AuthLayout({ children, maxWidth = "max-w-sm", pl = "lg:pl-[10%] xl:pl-[15%]" }) {
  return (
    <div className="grid flex-1 w-full lg:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className={`flex flex-1 items-center justify-center lg:justify-start ${pl}`}>
          <div className={`w-full ${maxWidth}`}>
            {children}
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block p-6 lg:p-10 xl:p-12 bg-background">
        <div className="h-full w-full relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50 bg-muted">
          <img
            src="https://res.cloudinary.com/dnwohqbqt/image/upload/v1780936259/login_illustration_usvffb.jpg"
            alt="ShopSphere shopping illustration"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7]"
          />
        </div>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  pl: PropTypes.string,
};

export default AuthLayout;
