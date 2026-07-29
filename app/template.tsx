// Re-mounts on every navigation, so the CSS entrance animation replays per route.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
