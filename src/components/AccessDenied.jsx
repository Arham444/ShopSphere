import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CiLock } from "react-icons/ci";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function AccessDenied({
  message = "You do not have permission to view this page.",
  icon = <CiLock className="h-10 w-10 text-muted-foreground" />,
  actionText = "Go to Login",
  onAction,
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) onAction();
    else navigate("/login");
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 min-h-[50vh]">
      <Card className="w-full max-w-md border-muted">
        <CardContent className="flex flex-col items-center justify-center p-8 gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>
          <p className="text-lg font-medium text-foreground">{message}</p>
          <Button
            onClick={handleAction}
            size="lg"
            className="mt-2 w-full sm:w-auto"
          >
            {actionText}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

AccessDenied.propTypes = {
  message: PropTypes.node,
  icon: PropTypes.node,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
};

export default AccessDenied;
