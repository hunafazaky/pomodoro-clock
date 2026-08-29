import { GlobalRegistrator } from '@happy-dom/global-registrator'
import { expect } from 'bun:test'
import matchers from '@testing-library/jest-dom/matchers'

GlobalRegistrator.register()
expect.extend(matchers)
