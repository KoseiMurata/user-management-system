import { User } from "@/types/User";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {user.email}
        </Typography>
        <Typography variant="body2">役割: {user.role}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
