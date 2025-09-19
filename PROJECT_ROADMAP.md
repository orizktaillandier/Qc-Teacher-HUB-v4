# Quebec Teacher Hub v4 - Project Roadmap & Lessons Learned

**Date**: September 19, 2025
**Session**: Fresh Start - v4 Development
**GitHub Repository**: https://github.com/orizktaillandier/Qc-Teacher-HUB-v4.git

---

## 🎯 Project Goals - v4

### Primary Objective
Create a clean, fast, and reliable Quebec educational content generation platform with:
- **Dark mode UI** that works properly
- **Smooth and reactive interface**
- **Fast development experience** with Turbopack
- **Simplified architecture** - avoid v3's complexity
- **Working dropdowns and form controls**
- **NextUI framework** instead of problematic Chakra UI v3

### Core Features (Simplified)
1. **Quebec Curriculum Integration** - Preserve the working PFEQ knowledge base
2. **Drill Exercise Generation** - Keep the functional AI generation system
3. **PDF Export** - Maintain the working PDF export functionality
4. **Teacher Dashboard** - Clean, intuitive interface
5. **Responsive Design** - Mobile-first approach

### Technology Stack - v4
- **Framework**: Next.js 15 + React 19
- **UI Library**: **NextUI** (replacing Chakra UI v3)
- **Build Tool**: **Turbopack enabled** for fast development
- **Database**: Keep hybrid SQLite + PostgreSQL approach
- **Styling**: NextUI's built-in theming system
- **State Management**: React Query + React hooks

---

## 📚 Quebec Teacher Hub v3 - Lessons Learned

### ✅ What Worked Well in v3

#### 1. **PDF Export System - FULLY OPERATIONAL**
- Libraries: jsPDF (3.0.3) + html2canvas (1.4.1)
- Multi-page support with intelligent content splitting
- Quebec branding and professional layout
- Smart filename generation
- **KEEP THIS**: The PDF export is the crown jewel of v3

#### 2. **Quebec Educational Content Generation**
- High-quality exercises with authentic Quebec contexts
- PFEQ compliance maintained
- Teacher guides with complete pedagogical resources
- Cultural representation in student names
- **KEEP THIS**: The content generation pipeline works excellently

#### 3. **Knowledge Base System**
- 346 curriculum chunks in SQLite (1.7MB)
- Sub-100ms query performance
- Comprehensive Quebec curriculum coverage
- **KEEP THIS**: Knowledge retrieval system is solid

#### 4. **Architecture Decisions That Worked**
- Hybrid database strategy (SQLite for knowledge, PostgreSQL for user data)
- Next.js 15 + App Router
- TypeScript strict mode
- API-first design

### ❌ Critical Problems in v3 (AVOID IN V4)

#### 1. **Chakra UI v3 Compatibility Nightmare**
**Problem**: Severe compatibility issues causing UI breakage
- Dropdown visibility issues (white text on white background)
- Form components not working properly
- Complex theming system conflicts
- Breaking changes from v2 to v3 not properly handled

**Solution for v4**: **Switch to NextUI** - mature, stable, dark-mode ready

#### 2. **JSX Syntax Errors - COMPILATION BLOCKING**
**Problem**: Multiple "Unterminated regexp literal" errors
- `DrillGeneratorInterface.tsx:494` - Missing closing JSX tag
- `DrillGeneratorInterface.tsx:953` - Unterminated regexp literal
- `DrillGeneratorInterface.tsx:1032` - Unterminated regexp literal

**Root Cause**: Complex, messy component structure with embedded regex
**Solution for v4**: **Clean component architecture** with proper separation

#### 3. **UI Complexity Causing Development Friction**
**Problem**: User feedback: "v3 went side ways real fucking quick"
- Overly complex component hierarchies
- Difficult to debug UI issues
- Poor developer experience
- Hard to make simple changes

**Solution for v4**: **Simplicity first** - clean, maintainable components

#### 4. **LLM Visual Generation - NOT WORKING**
**Problem**: OpenAI API not generating `visualElements` despite aggressive prompting
- Console logs show missing `visualElements` field in responses
- Multiple prompt engineering attempts failed
- Unknown root cause (model behavior, token limits, JSON schema)

**Solution for v4**: **Defer complex features** - focus on core functionality first

#### 5. **Development Experience Issues**
- TypeScript compilation failures blocking development
- Complex debugging due to UI framework issues
- Poor error messages from Chakra UI v3
- Slow iteration cycles

**Solution for v4**: **Fast, reliable dev experience** with Turbopack + NextUI

---

## 🚫 Critical Mistakes to AVOID in v4

### 1. **DON'T Use Chakra UI v3**
- Proven compatibility problems
- Complex theming system
- Form component issues
- Breaking changes from v2

### 2. **DON'T Create Complex Component Hierarchies**
- Keep components simple and focused
- Avoid deeply nested JSX structures
- Separate concerns properly
- Use composition over inheritance

### 3. **DON'T Ignore TypeScript Errors**
- Fix compilation errors immediately
- Don't accumulate technical debt
- Use strict type checking from the start

### 4. **DON'T Overcomplicate the Initial UI**
- Start with basic, working components
- Add complexity incrementally
- Test each component thoroughly before moving on

### 5. **DON'T Try to Fix Everything at Once**
- Focus on one feature at a time
- Get basic functionality working first
- Avoid feature creep early in development

---

## 📋 v4 Development Roadmap

### Phase 1: Foundation (Current)
- [x] Create v4 project folder
- [x] Document lessons learned and goals
- [ ] Inspect Typebot UI for design reference
- [ ] Setup Next.js 15 + NextUI + Turbopack
- [ ] Configure GitHub repository integration

### Phase 2: Core UI (Next)
- [ ] Create basic dark mode layout
- [ ] Implement working dropdowns and forms
- [ ] Setup routing and navigation
- [ ] Test UI components thoroughly

### Phase 3: Integration (Later)
- [ ] Port working knowledge base from v3
- [ ] Port working PDF export functionality
- [ ] Port working content generation pipeline
- [ ] Test end-to-end functionality

### Phase 4: Enhancement (Future)
- [ ] Add advanced features gradually
- [ ] Implement visual generation (when working)
- [ ] Performance optimization
- [ ] Production deployment

---

## 🔧 Development Standards for v4

### Code Quality
- **TypeScript**: Strict mode, no compilation errors
- **Components**: Single responsibility, clean interfaces
- **Testing**: Test each component before integration
- **Documentation**: Log every step and decision

### UI Standards
- **Dark mode first**: Design for dark theme primarily
- **Responsive**: Mobile-first approach
- **Fast**: Optimize for speed and reactivity
- **Simple**: Clean, intuitive interface

### Development Process
- **Incremental**: Build and test each piece
- **Logged**: Document every step and result
- **Version controlled**: Regular commits to GitHub
- **Recovery ready**: Backup before major changes

---

## 🎨 NextUI Integration Plan

### Why NextUI over Chakra UI v3?
1. **Mature and stable** - fewer breaking changes
2. **Built-in dark mode** - no complex theming required
3. **Modern design system** - clean, professional look
4. **TypeScript first** - excellent type support
5. **Performance optimized** - fast rendering
6. **Good documentation** - clear examples and guides

### NextUI Components to Use
- `Input`, `Select`, `Button` - for forms (replacing broken Chakra components)
- `Card`, `Modal`, `Dropdown` - for UI layout
- `Table`, `Pagination` - for data display
- `Navigation`, `Tabs` - for page organization

### Turbopack Integration
- Enable in `next.config.js` for fast development builds
- Optimize bundle size and hot reload performance
- Test compatibility with NextUI components

---

## 📊 Success Metrics for v4

### Development Experience
- [ ] Zero TypeScript compilation errors
- [ ] Fast hot reload (< 1 second)
- [ ] Clean, readable component code
- [ ] Easy to debug and modify

### UI Functionality
- [ ] All dropdowns and forms work properly
- [ ] Dark mode looks professional
- [ ] Responsive on all devices
- [ ] Fast, smooth interactions

### Core Features
- [ ] Knowledge base integration working
- [ ] PDF export functionality preserved
- [ ] Content generation pipeline functional
- [ ] User authentication working

### Code Quality
- [ ] Comprehensive TypeScript types
- [ ] Reusable component library
- [ ] Clear error handling
- [ ] Proper state management

---

This roadmap serves as our foundation for v4 development. Every decision should be evaluated against these lessons learned to avoid repeating v3's mistakes while preserving its successful features.