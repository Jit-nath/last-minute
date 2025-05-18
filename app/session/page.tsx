export default function Profile() {
  return (
    <div className="h-full">
      <nav className="h-16">save session</nav>
      <div className="flex h-full">
        {/* side bar */}
        <div className="w-96 bg-muted p-6">sidebar</div>
        {/* video watching section */}
        <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex-1"> videos</div>
            <div className="h-72">notes</div>
          </div>
        </div>
      </div>
    </div>
  );
}
