import ReactGA from "react-ga";

export const initGA = () => {
  const analyticsId = process.env.NEXT_PUBLIC_GA_ANALYTICS || "";
  ReactGA.initialize(analyticsId);
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
