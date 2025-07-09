import * as amplitude from "@amplitude/analytics-browser";

amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
  autocapture: true,
});

export default amplitude;
