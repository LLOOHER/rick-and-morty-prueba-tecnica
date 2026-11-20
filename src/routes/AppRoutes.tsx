import { Route, Routes } from 'react-router'
import { FavoritesPage } from '../pages/FavoritesPage'
import { HomePage } from '../pages/HomePage'
import { ROUTES } from './paths'

export function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.favorites} element={<FavoritesPage />} />
        </Routes>
    )
}
