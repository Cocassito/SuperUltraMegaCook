import { View, Text, StyleSheet } from "react-native";
import Gauge from "./Gauge";
import Step from "./Step";
import Toc from "./Toc";

type StepperProps = {
  totalSteps: number;
  currentStep: number;
  stepTitles: string[]; // titres des étapes
};

export default function Stepper({
  totalSteps,
  currentStep,
  stepTitles,
}: StepperProps) {
  return (
    <>
      <View style={{ position: "absolute", top: 24, left: 24, zIndex: 10 }}>
        <Toc />
      </View>

      <Text style={styles.activeStepTitle}>
        {stepTitles[currentStep] || `Step ${currentStep}`}
      </Text>
      <View style={styles.container}>
        <Gauge />
      </View>

      {/* Steps */}
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;

          return (
            <View
              key={index}
              style={[styles.stepWrapper, { opacity: isActive ? 1 : 0.3 }]}
            >
              <Step />
            </View>
          );
        })}
      </View>
    </>
  );
}

const STEP_GAP = 9;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingTop: 24,
    paddingLeft: 24,
    top: 0,
    left: 0,
    zIndex: 1,
    alignItems: "flex-start",
  },
  activeStepTitle: {
    position: "absolute",
    top: 24,
    left: 77,
    zIndex: 2,
    fontFamily: "pixelgridtrial-linedownboldxl",
    fontSize: 16,
    marginBottom: 8,
    color: "#FFF",
  },
  stepsContainer: {
    position: "absolute",
    top: 50,
    left: 60,
    flexDirection: "row",
    zIndex: 2,
  },
  stepWrapper: {
    marginRight: STEP_GAP,
  },
});
