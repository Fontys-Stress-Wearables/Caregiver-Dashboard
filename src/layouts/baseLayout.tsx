import Header from '../components/header/header'
import './baseLayout.scss'

type Props = {
  children: JSX.Element
}

const BaseLayout = ({ children }: Props) => (
  <div className="BaseContainer">
    <Header />
    {children}
  </div>
)

export default BaseLayout
