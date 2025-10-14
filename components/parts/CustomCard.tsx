// components/parts/CustomCard.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// TODO: インターフェースを修正
interface CustomCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  actions?: React.ReactNode;
  imageUrl?: string;
  bgColor?: string;
  expandableDescription?: boolean;
  expandedInitially?: boolean;
}

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme?: any; expand: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  imageUrl,
  bgColor = "#fff",
  expandableDescription = false,
  expandedInitially = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 275, mb: 2, backgroundColor: bgColor }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="160"
          image={imageUrl}
          alt="card image"
        />
      )}
      <CardContent>
        {/*
		      TODO: [titel]と[description]を表示
		     */}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {expandableDescription ? (
          <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography variant="body2">{description}</Typography>
            </Collapse>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ display: "flex", marginLeft: "auto" }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </>
        ) : (
          <Typography variant="body2">{description}</Typography>
        )}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
