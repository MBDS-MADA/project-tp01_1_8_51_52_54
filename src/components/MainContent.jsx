function MainContent()
{
  const today=new Date();
  const time=today.toLocaleTimeString("fr-Fr")
  return (
    <div>
      <p>Ici, nous afficherons des informations interessantes :) </p>
      <p>Bonjour, on est le {today.getDate()}, {today.getMonth()}, {today.getFullYear()} et il est {time}</p>
    </div>
  )
}
export default MainContent