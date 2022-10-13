import Alert from "@mui/material/Alert";

export default function Toaster(props) {
  return (
    <Alert className="bg-white" variant="outlined" severity={props.type}>
      <p className="text-black font-semibold"> {props.message}</p>
    </Alert>
  );
}
