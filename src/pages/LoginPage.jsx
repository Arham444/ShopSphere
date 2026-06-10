import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import authData from "../features/auth/authData.json";
import { loadState } from "../utils/localStorage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const localUsers = loadState("registeredUsers", []);
    const matchedUser =
      authData.users.find(
        (u) => u.username === username && u.password === password,
      ) ||
      localUsers.find(
        (u) => u.username === username && u.password === password,
      );

    if (matchedUser) {
      const userKey = matchedUser.username;
      const userCart = loadState(`cartItems_${userKey}`, []);
      const userWishlist = loadState(`wishlistItems_${userKey}`, []);

      dispatch(
        login({
          user: { username: matchedUser.username, role: matchedUser.role },
          cartItems: userCart,
          wishListItems: userWishlist,
        }),
      );
      navigate("/");
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleQuickLogin = () => {
    dispatch(
      login({
        user: { role: "guest" },
        cartItems: [],
        wishListItems: [],
      }),
    );
    navigate("/");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 min-h-[calc(100vh-140px)] bg-muted/40">
      <Card className="w-full max-w-4xl overflow-hidden shadow-lg border-0">
        <div className="grid md:grid-cols-2">
          {/* Left Side: Illustration Panel */}
          <div className="hidden md:block bg-muted relative">
            <img
              src="https://res.cloudinary.com/dnwohqbqt/image/upload/v1780936259/login_illustration_usvffb.jpg"
              alt="ShopSphere shopping illustration"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Right Side: Form Panel */}
          <CardContent className="p-8 md:p-12">
            <CardHeader className="p-0 mb-8 space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </CardTitle>
              <CardDescription className="text-base">
                Sign in to your ShopSphere account
              </CardDescription>
            </CardHeader>

            {error && (
              <div className="p-3 mb-6 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold mt-2"
              >
                Sign In
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">
                  OR
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleQuickLogin}
              className="w-full h-11 text-base font-semibold"
            >
              Continue as Guest
            </Button>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
