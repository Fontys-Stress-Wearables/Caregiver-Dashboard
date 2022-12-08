import Header from '../components/Header/Header'
import styles from './BaseLayout.module.scss'

type Props = {
  children: JSX.Element | JSX.Element[]
}

const BaseLayout = ({ children }: Props) => (
  <div className={styles.Container}>
    <Header />
    {children}
  </div>
)

export default BaseLayout
