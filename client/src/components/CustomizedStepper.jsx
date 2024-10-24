import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const sequence = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];

const generateSteps = ({ type, status }) => {
  const activeStepIndex = sequence.indexOf(type);

  const steps = sequence.map((type, index) => {
    if (index < activeStepIndex) {
      return { type: type, status: "approved" };
    } else if (index === activeStepIndex) {
      return { type: type, status };
    } else {
      return { type: type, status: "not-submitted" };
    }
  });

  return {
    steps,
    activeStep: activeStepIndex,
  };
};

export default function CustomizedStepper({ nextStep }) {
  const { steps, activeStep } = generateSteps(nextStep);

  return (
    <Box sx={{ width: "100%", mt: 3, mb: 5 }}>
      <Stepper activeStep={activeStep}>
        {steps.map(({ type, status }) => {
          const labelProps = {};
          if (status === "rejected") {
            labelProps.error = true;
          } else if (status === "approved") {
          }

          return (
            <Step key={type}>
              <StepLabel {...labelProps}>{type}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
