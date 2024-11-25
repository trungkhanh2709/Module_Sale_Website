import Menu from '../components/menu'
import '../style/homepage.css'

export function Home() {
  return (
    <div>
      <Menu></Menu>
      <Background></Background>
    </div>
  )
}
export function Background() {
  return <div className="background_image_homepage"></div>
}
